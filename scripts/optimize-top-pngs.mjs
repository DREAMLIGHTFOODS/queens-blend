#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PROJECT_ROOT = process.cwd();
const IMAGES_ROOT = path.resolve(PROJECT_ROOT, "public/images");
const TOP_LIMIT = Number(process.env.TOP_LIMIT || "20");
const MIN_IMPROVEMENT_RATIO = 0.02;

async function walk(dir, bucket = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const absPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(absPath, bucket);
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".png")) {
      const stat = await fs.stat(absPath);
      bucket.push({ absPath, size: stat.size });
    }
  }

  return bucket;
}

function toMb(bytes) {
  return Number((bytes / 1024 / 1024).toFixed(2));
}

async function optimizeFile(file) {
  const sourceBuffer = await fs.readFile(file.absPath);

  const optimized = await sharp(sourceBuffer)
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      effort: 10,
      palette: true,
      quality: 82,
    })
    .toBuffer();

  if (optimized.length >= sourceBuffer.length * (1 - MIN_IMPROVEMENT_RATIO)) {
    return {
      changed: false,
      before: sourceBuffer.length,
      after: optimized.length,
    };
  }

  await fs.writeFile(file.absPath, optimized);

  return {
    changed: true,
    before: sourceBuffer.length,
    after: optimized.length,
  };
}

async function main() {
  const files = await walk(IMAGES_ROOT);
  const topFiles = files.sort((a, b) => b.size - a.size).slice(0, TOP_LIMIT);

  let totalBefore = 0;
  let totalAfter = 0;
  let changedCount = 0;

  for (const file of topFiles) {
    const result = await optimizeFile(file);
    totalBefore += result.before;
    totalAfter += result.changed ? result.after : result.before;
    if (result.changed) {
      changedCount += 1;
    }

    const relPath = path.relative(PROJECT_ROOT, file.absPath).replace(/\\/g, "/");
    const deltaPct = Number((((result.before - result.after) / result.before) * 100).toFixed(1));
    const label = result.changed ? "optimized" : "skipped";
    console.log(
      `${label.padEnd(9)} ${relPath}  ${toMb(result.before)}MB -> ${toMb(result.changed ? result.after : result.before)}MB${result.changed ? ` (-${deltaPct}%)` : ""}`,
    );
  }

  const saved = totalBefore - totalAfter;
  const savedPct = totalBefore > 0 ? Number(((saved / totalBefore) * 100).toFixed(1)) : 0;

  console.log("\nSummary");
  console.log(`Files considered: ${topFiles.length}`);
  console.log(`Files changed: ${changedCount}`);
  console.log(`Total: ${toMb(totalBefore)}MB -> ${toMb(totalAfter)}MB`);
  console.log(`Saved: ${toMb(saved)}MB (${savedPct}%)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
