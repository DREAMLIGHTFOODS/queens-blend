#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

const PROJECT_ROOT = process.cwd();
const VIDEOS_DIR = path.resolve(PROJECT_ROOT, "public/videos");
const MIN_SAVE_RATIO = 0.03;
const MAX_WIDTH = Number(process.env.VIDEO_MAX_WIDTH || "1920");
const CRF = Number(process.env.VIDEO_CRF || "28");

function toMb(bytes) {
  return Number((bytes / 1024 / 1024).toFixed(2));
}

async function listMp4Files() {
  const entries = await fs.readdir(VIDEOS_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".mp4"))
    .map((entry) => path.join(VIDEOS_DIR, entry.name));
}

function encode(inputFile, outputFile) {
  const scaleFilter = `scale='min(${MAX_WIDTH},iw)':-2`;
  const args = [
    "-y",
    "-i",
    inputFile,
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    String(CRF),
    "-vf",
    scaleFilter,
    "-movflags",
    "+faststart",
    outputFile,
  ];

  const result = spawnSync(ffmpegPath, args, {
    stdio: ["ignore", "ignore", "pipe"],
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${path.basename(inputFile)}: ${result.stderr}`);
  }
}

async function optimizeOne(filePath) {
  const beforeStat = await fs.stat(filePath);
  const tempPath = `${filePath}.opt.mp4`;

  encode(filePath, tempPath);

  const afterStat = await fs.stat(tempPath);
  const savedRatio = 1 - afterStat.size / beforeStat.size;

  if (savedRatio < MIN_SAVE_RATIO) {
    await fs.unlink(tempPath);
    return {
      changed: false,
      before: beforeStat.size,
      after: beforeStat.size,
    };
  }

  await fs.rename(tempPath, filePath);

  return {
    changed: true,
    before: beforeStat.size,
    after: afterStat.size,
  };
}

async function main() {
  const files = await listMp4Files();
  let totalBefore = 0;
  let totalAfter = 0;
  let changed = 0;

  for (const filePath of files) {
    const result = await optimizeOne(filePath);
    totalBefore += result.before;
    totalAfter += result.after;
    if (result.changed) {
      changed += 1;
    }

    const rel = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, "/");
    const deltaPct = Number((((result.before - result.after) / result.before) * 100).toFixed(1));
    console.log(
      `${result.changed ? "optimized" : "skipped"} ${rel}  ${toMb(result.before)}MB -> ${toMb(result.after)}MB${result.changed ? ` (-${deltaPct}%)` : ""}`,
    );
  }

  const saved = totalBefore - totalAfter;
  const savedPct = totalBefore > 0 ? Number(((saved / totalBefore) * 100).toFixed(1)) : 0;

  console.log("\nSummary");
  console.log(`Files considered: ${files.length}`);
  console.log(`Files changed: ${changed}`);
  console.log(`Total: ${toMb(totalBefore)}MB -> ${toMb(totalAfter)}MB`);
  console.log(`Saved: ${toMb(saved)}MB (${savedPct}%)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
