#!/usr/bin/env node

import { createGzip } from "node:zlib";
import { createReadStream } from "node:fs";
import { promises as fs } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { once } from "node:events";
import { performance } from "node:perf_hooks";

const PROJECT_ROOT = process.cwd();
const REPORT_PATH = resolve(PROJECT_ROOT, "docs/reports/perf-snapshot.json");
const DEFAULT_BASELINE_PATH = resolve(PROJECT_ROOT, "docs/reports/perf-baseline.json");

const DEFAULT_PORT = Number(process.env.PERF_PORT || "3107");
const DEFAULT_HOST = process.env.PERF_HOST || "127.0.0.1";
const DEFAULT_ROUTES = ["/", "/products", "/products/category/heritage", "/tea-guide"];

function parseNumberFlag(argv, key) {
  const prefixed = `${key}=`;
  const entry = argv.find((arg) => arg.startsWith(prefixed));
  if (!entry) {
    return null;
  }
  const raw = Number(entry.slice(prefixed.length));
  return Number.isFinite(raw) ? raw : null;
}

function parseStringFlag(argv, key) {
  const prefixed = `${key}=`;
  const entry = argv.find((arg) => arg.startsWith(prefixed));
  return entry ? entry.slice(prefixed.length) : null;
}

function parseBooleanArg(rawValue) {
  if (typeof rawValue !== "string") {
    return null;
  }

  const normalized = rawValue.trim().toLowerCase();
  if (["true", "1", "yes", "on"].includes(normalized)) {
    return true;
  }

  if (["false", "0", "no", "off"].includes(normalized)) {
    return false;
  }

  return null;
}

function parseBooleanFlag(argv, key, defaultValue = false) {
  const explicitTrue = argv.includes(key);
  if (explicitTrue) {
    return true;
  }

  const explicitFalse = argv.includes(`--no-${key.slice(2)}`);
  if (explicitFalse) {
    return false;
  }

  const raw = parseStringFlag(argv, key);
  if (raw === null) {
    return defaultValue;
  }

  const parsed = parseBooleanArg(raw);
  if (parsed === null) {
    throw new Error(`Invalid boolean for ${key}: ${raw}`);
  }

  return parsed;
}

function parseRoutes(argv) {
  const routesFlag = parseStringFlag(argv, "--routes");
  if (!routesFlag) {
    return DEFAULT_ROUTES;
  }

  return routesFlag
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((route) => (route.startsWith("/") ? route : `/${route}`));
}

function toKb(bytes) {
  return Number((bytes / 1024).toFixed(2));
}

async function gzipSize(filePath) {
  return new Promise((resolveSize, rejectSize) => {
    const source = createReadStream(filePath);
    const gzip = createGzip();
    let total = 0;

    gzip.on("data", (chunk) => {
      total += chunk.length;
    });

    gzip.on("error", rejectSize);
    source.on("error", rejectSize);
    gzip.on("end", () => resolveSize(total));

    source.pipe(gzip);
  });
}

async function readBundleSnapshot() {
  const chunksRoot = resolve(PROJECT_ROOT, ".next/static/chunks");
  let entries;

  try {
    entries = await fs.readdir(chunksRoot, { withFileTypes: true });
  } catch {
    return {
      jsFiles: 0,
      totalJsKb: 0,
      totalGzipKb: 0,
      largestFiles: [],
    };
  }

  const jsFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
    .map((entry) => join(chunksRoot, entry.name));

  const details = [];
  let totalBytes = 0;
  let totalGzipBytes = 0;

  for (const filePath of jsFiles) {
    const stat = await fs.stat(filePath);
    const gzBytes = await gzipSize(filePath);
    totalBytes += stat.size;
    totalGzipBytes += gzBytes;
    details.push({
      file: filePath
        .replace(PROJECT_ROOT + "/", "")
        .replace(PROJECT_ROOT + "\\", "")
        .replace(/\\/g, "/"),
      rawKb: toKb(stat.size),
      gzipKb: toKb(gzBytes),
    });
  }

  details.sort((a, b) => b.rawKb - a.rawKb);

  return {
    jsFiles: jsFiles.length,
    totalJsKb: toKb(totalBytes),
    totalGzipKb: toKb(totalGzipBytes),
    largestFiles: details.slice(0, 8),
  };
}

function runBuildIfNeeded({ shouldBuild }) {
  if (!shouldBuild) {
    return;
  }

  const buildResult =
    process.platform === "win32"
      ? spawnSync("cmd.exe", ["/d", "/s", "/c", "npm run build"], {
          cwd: PROJECT_ROOT,
          stdio: "inherit",
          env: process.env,
          windowsHide: true,
        })
      : spawnSync("npm", ["run", "build"], {
          cwd: PROJECT_ROOT,
          stdio: "inherit",
          env: process.env,
        });

  if (buildResult.status !== 0) {
    process.exit(buildResult.status ?? 1);
  }
}

function assertCleanGitWorktreeIfRequired({ requireCleanGit, baselinePath }) {
  if (!requireCleanGit) {
    return;
  }

  const statusResult = spawnSync("git", ["status", "--porcelain"], {
    cwd: PROJECT_ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env,
  });

  if (statusResult.status !== 0) {
    throw new Error("Unable to verify git status for --require-clean-git.");
  }

  const output = (statusResult.stdout || "").trim();
  if (output.length > 0) {
    throw new Error(
      `Refusing to update baseline with a dirty git worktree. Commit or stash changes, then rerun. Baseline target: ${baselinePath}`,
    );
  }
}

async function waitForServer(baseUrl, timeoutMs = 30000) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`${baseUrl}/robots.txt`, { cache: "no-store" });
      if (response.ok) {
        return;
      }
    } catch {
      // Keep polling until the server is ready.
    }

    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }

  throw new Error("Server did not start within the timeout window.");
}

function calculateStats(samples) {
  if (samples.length === 0) {
    return { avgMs: 0, minMs: 0, maxMs: 0 };
  }

  const total = samples.reduce((sum, value) => sum + value, 0);
  return {
    avgMs: Number((total / samples.length).toFixed(1)),
    minMs: Number(Math.min(...samples).toFixed(1)),
    maxMs: Number(Math.max(...samples).toFixed(1)),
  };
}

async function measureRoute(baseUrl, route, runs) {
  const samples = [];

  for (let i = 0; i < runs; i += 1) {
    const started = performance.now();
    const response = await fetch(`${baseUrl}${route}`, { cache: "no-store" });
    const ended = performance.now();

    if (!response.ok) {
      throw new Error(`Route ${route} returned ${response.status}`);
    }

    samples.push(ended - started);
  }

  return {
    route,
    runs,
    ...calculateStats(samples),
  };
}

async function measureRoutes({ baseUrl, routes, runs }) {
  const results = [];

  for (const route of routes) {
    const timing = await measureRoute(baseUrl, route, runs);
    results.push(timing);
  }

  return results;
}

async function writeReport(report) {
  await fs.mkdir(resolve(PROJECT_ROOT, "docs/reports"), { recursive: true });
  await fs.writeFile(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");
}

async function writeJsonFile(filePath, data) {
  await fs.mkdir(dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

async function readJsonFile(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function compareAgainstBaseline(currentReport, baselineReport) {
  const baselineRoutes = new Map(
    Array.isArray(baselineReport?.routes)
      ? baselineReport.routes.map((entry) => [entry.route, entry])
      : [],
  );

  const bundleDeltaKb = Number(
    ((currentReport.bundle?.totalJsKb ?? 0) - (baselineReport.bundle?.totalJsKb ?? 0)).toFixed(2),
  );
  const baselineTotalJsKb = baselineReport.bundle?.totalJsKb ?? 0;
  const bundleDeltaPct =
    baselineTotalJsKb > 0 ? Number(((bundleDeltaKb / baselineTotalJsKb) * 100 || 0).toFixed(2)) : 0;

  const routeDeltas = (currentReport.routes ?? []).map((currentRoute) => {
    const baselineRoute = baselineRoutes.get(currentRoute.route);
    const baselineAvgMs = baselineRoute?.avgMs ?? null;
    const currentAvgMs = currentRoute.avgMs ?? 0;
    const deltaMs =
      typeof baselineAvgMs === "number" ? Number((currentAvgMs - baselineAvgMs).toFixed(1)) : null;
    const deltaPct =
      typeof baselineAvgMs === "number" && baselineAvgMs > 0 && deltaMs !== null
        ? Number(((deltaMs / baselineAvgMs) * 100 || 0).toFixed(2))
        : null;

    return {
      route: currentRoute.route,
      baselineAvgMs,
      currentAvgMs,
      deltaMs,
      deltaPct,
    };
  });

  return {
    baselineGeneratedAt: baselineReport.generatedAt ?? null,
    bundle: {
      baselineTotalJsKb,
      currentTotalJsKb: currentReport.bundle?.totalJsKb ?? 0,
      deltaKb: bundleDeltaKb,
      deltaPct: bundleDeltaPct,
    },
    routes: routeDeltas,
  };
}

async function main() {
  const argv = process.argv.slice(2);
  const shouldBuild = argv.includes("--build");
  const runs = parseNumberFlag(argv, "--runs") ?? 3;
  const port = parseNumberFlag(argv, "--port") ?? DEFAULT_PORT;
  const host = parseStringFlag(argv, "--host") ?? DEFAULT_HOST;
  const compareBaseline = parseBooleanFlag(argv, "--compare-baseline", false);
  const updateBaseline = parseBooleanFlag(argv, "--update-baseline", false);
  const requireCleanGit = parseBooleanFlag(argv, "--require-clean-git", false);
  const baselinePath = resolve(
    PROJECT_ROOT,
    parseStringFlag(argv, "--baseline") ?? DEFAULT_BASELINE_PATH,
  );
  const maxTotalJsKb = parseNumberFlag(argv, "--max-total-js-kb");
  const maxRouteAvgMs = parseNumberFlag(argv, "--max-route-avg-ms");
  const maxTotalJsGrowthKb = parseNumberFlag(argv, "--max-total-js-growth-kb");
  const maxTotalJsGrowthPct = parseNumberFlag(argv, "--max-total-js-growth-pct");
  const maxRouteAvgRegressionMs = parseNumberFlag(argv, "--max-route-avg-regression-ms");
  const maxRouteAvgRegressionPct = parseNumberFlag(argv, "--max-route-avg-regression-pct");
  const routes = parseRoutes(argv);
  const baseUrl = `http://${host}:${port}`;

  if (updateBaseline) {
    assertCleanGitWorktreeIfRequired({ requireCleanGit, baselinePath });
  }

  runBuildIfNeeded({ shouldBuild });

  const startArgs = ["run", "start", "--", "--hostname", host, "--port", String(port)];
  const server =
    process.platform === "win32"
      ? spawn("cmd.exe", ["/d", "/s", "/c", `npm ${startArgs.join(" ")}`], {
          cwd: PROJECT_ROOT,
          stdio: ["ignore", "pipe", "pipe"],
          env: process.env,
          windowsHide: true,
        })
      : spawn("npm", startArgs, {
          cwd: PROJECT_ROOT,
          stdio: ["ignore", "pipe", "pipe"],
          env: process.env,
        });

  const logs = [];
  server.stdout.on("data", (chunk) => logs.push(String(chunk)));
  server.stderr.on("data", (chunk) => logs.push(String(chunk)));

  let exitCode = 0;

  try {
    await waitForServer(baseUrl);

    const [bundle, routeTimings] = await Promise.all([
      readBundleSnapshot(),
      measureRoutes({ baseUrl, routes, runs }),
    ]);

    let baselineComparison = null;
    if (compareBaseline) {
      let baselineReport;
      try {
        baselineReport = await readJsonFile(baselinePath);
      } catch {
        throw new Error(
          `Baseline file not found or invalid JSON: ${baselinePath}. Run with --update-baseline first.`,
        );
      }

      baselineComparison = compareAgainstBaseline(
        {
          bundle,
          routes: routeTimings,
        },
        baselineReport,
      );
    }

    const report = {
      generatedAt: new Date().toISOString(),
      baseUrl,
      build: {
        nextDirExists: true,
      },
      bundle,
      routes: routeTimings,
      thresholds: {
        maxTotalJsKb,
        maxRouteAvgMs,
        maxTotalJsGrowthKb,
        maxTotalJsGrowthPct,
        maxRouteAvgRegressionMs,
        maxRouteAvgRegressionPct,
      },
      baseline: baselineComparison,
    };

    await writeReport(report);

    if (updateBaseline) {
      await writeJsonFile(baselinePath, report);
    }

    const failingRoutes =
      typeof maxRouteAvgMs === "number"
        ? routeTimings.filter((entry) => entry.avgMs > maxRouteAvgMs)
        : [];
    const isBundleOverBudget =
      typeof maxTotalJsKb === "number" ? bundle.totalJsKb > maxTotalJsKb : false;

    const hasBundleGrowthRegression =
      baselineComparison &&
      ((typeof maxTotalJsGrowthKb === "number" &&
        baselineComparison.bundle.deltaKb > maxTotalJsGrowthKb) ||
        (typeof maxTotalJsGrowthPct === "number" &&
          baselineComparison.bundle.deltaPct > maxTotalJsGrowthPct));

    const failingRelativeRoutes =
      baselineComparison &&
      baselineComparison.routes.filter((entry) => {
        const deltaMs = typeof entry.deltaMs === "number" ? entry.deltaMs : null;
        const deltaPct = typeof entry.deltaPct === "number" ? entry.deltaPct : null;

        const exceedsMs =
          typeof maxRouteAvgRegressionMs === "number" &&
          deltaMs !== null &&
          deltaMs > maxRouteAvgRegressionMs;
        const exceedsPct =
          typeof maxRouteAvgRegressionPct === "number" &&
          deltaPct !== null &&
          deltaPct > maxRouteAvgRegressionPct;

        return exceedsMs || exceedsPct;
      });

    console.log("\nPerf snapshot written:");
    console.log(`- ${REPORT_PATH}`);
    console.log(`- Total JS: ${bundle.totalJsKb} KB (${bundle.totalGzipKb} KB gzip)`);
    console.log("- Route timings (avg/min/max ms):");
    for (const entry of routeTimings) {
      console.log(`  ${entry.route}: ${entry.avgMs}/${entry.minMs}/${entry.maxMs}`);
    }

    if (updateBaseline) {
      console.log(`- Baseline updated: ${baselinePath}`);
      if (requireCleanGit) {
        console.log("- Baseline update ran with clean-git guard enabled");
      }
    }

    if (baselineComparison) {
      console.log("- Baseline comparison:");
      console.log(
        `  bundle delta: ${baselineComparison.bundle.deltaKb} KB (${baselineComparison.bundle.deltaPct}%)`,
      );
      for (const route of baselineComparison.routes) {
        if (route.deltaMs === null) {
          console.log(`  ${route.route}: no baseline route timing available`);
          continue;
        }

        console.log(`  ${route.route}: delta ${route.deltaMs}ms (${route.deltaPct}%) vs baseline`);
      }
    }

    if (
      isBundleOverBudget ||
      failingRoutes.length > 0 ||
      hasBundleGrowthRegression ||
      (failingRelativeRoutes?.length ?? 0) > 0
    ) {
      console.error("\nPerf budgets exceeded.");
      if (isBundleOverBudget) {
        console.error(`- totalJsKb ${bundle.totalJsKb} > budget ${maxTotalJsKb}`);
      }
      for (const entry of failingRoutes) {
        console.error(`- ${entry.route} avg ${entry.avgMs}ms > budget ${maxRouteAvgMs}ms`);
      }
      if (baselineComparison && hasBundleGrowthRegression) {
        if (typeof maxTotalJsGrowthKb === "number") {
          console.error(
            `- bundle growth ${baselineComparison.bundle.deltaKb}KB > budget ${maxTotalJsGrowthKb}KB`,
          );
        }
        if (typeof maxTotalJsGrowthPct === "number") {
          console.error(
            `- bundle growth ${baselineComparison.bundle.deltaPct}% > budget ${maxTotalJsGrowthPct}%`,
          );
        }
      }
      if ((failingRelativeRoutes?.length ?? 0) > 0) {
        for (const entry of failingRelativeRoutes) {
          console.error(
            `- ${entry.route} regression ${entry.deltaMs}ms (${entry.deltaPct}%) exceeds relative budget`,
          );
        }
      }
      exitCode = 1;
    }
  } catch (error) {
    console.error("Perf snapshot failed.");
    if (error instanceof Error) {
      console.error(error.message);
    }
    if (logs.length > 0) {
      console.error("Server output:");
      console.error(logs.join(""));
    }
    exitCode = 1;
  } finally {
    if (process.platform === "win32" && server.pid) {
      spawnSync("taskkill", ["/pid", String(server.pid), "/t", "/f"], {
        stdio: "ignore",
      });
    } else {
      server.kill("SIGTERM");
      await once(server, "exit").catch(() => undefined);
    }
  }

  process.exit(exitCode);
}

main();
