#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const imagesDir = path.join(rootDir, "public", "images");
const videosDir = path.join(rootDir, "public", "videos");

const MAX_IMAGE_FILE_MB = Number(process.env.MAX_IMAGE_FILE_MB || "1.25");
const MAX_VIDEO_FILE_MB = Number(process.env.MAX_VIDEO_FILE_MB || "2.5");
const MAX_IMAGES_TOTAL_MB = Number(process.env.MAX_IMAGES_TOTAL_MB || "80");
const MAX_VIDEOS_TOTAL_MB = Number(process.env.MAX_VIDEOS_TOTAL_MB || "12");

function toMb(bytes) {
  return Number((bytes / (1024 * 1024)).toFixed(2));
}

function walkFiles(startDir, filterFn, bucket = []) {
  const entries = fs.readdirSync(startDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(startDir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, filterFn, bucket);
      continue;
    }

    if (entry.isFile() && filterFn(entry.name)) {
      const stat = fs.statSync(fullPath);
      bucket.push({
        path: fullPath,
        size: stat.size,
      });
    }
  }

  return bucket;
}

function asRelative(filePath) {
  return path.relative(rootDir, filePath).replace(/\\/g, "/");
}

function findOverBudget(files, maxMb) {
  return files
    .map((file) => ({
      ...file,
      sizeMb: toMb(file.size),
    }))
    .filter((file) => file.sizeMb > maxMb)
    .sort((a, b) => b.size - a.size);
}

function sumBytes(files) {
  return files.reduce((sum, file) => sum + file.size, 0);
}

function printTopFiles(label, files, limit = 8) {
  console.log(`\nTop ${Math.min(files.length, limit)} ${label}:`);
  files
    .sort((a, b) => b.size - a.size)
    .slice(0, limit)
    .forEach((file) => {
      console.log(`- ${asRelative(file.path)} (${toMb(file.size)}MB)`);
    });
}

const imageFiles = walkFiles(imagesDir, (name) => /\.(png|jpg|jpeg|webp|avif|gif)$/i.test(name));
const videoFiles = walkFiles(videosDir, (name) => /\.(mp4|webm)$/i.test(name));

const imagesTotalMb = toMb(sumBytes(imageFiles));
const videosTotalMb = toMb(sumBytes(videoFiles));

const overImageBudget = findOverBudget(imageFiles, MAX_IMAGE_FILE_MB);
const overVideoBudget = findOverBudget(videoFiles, MAX_VIDEO_FILE_MB);

const errors = [];

if (imagesTotalMb > MAX_IMAGES_TOTAL_MB) {
  errors.push(
    `Total images budget exceeded: ${imagesTotalMb}MB > ${MAX_IMAGES_TOTAL_MB}MB (public/images).`,
  );
}

if (videosTotalMb > MAX_VIDEOS_TOTAL_MB) {
  errors.push(
    `Total videos budget exceeded: ${videosTotalMb}MB > ${MAX_VIDEOS_TOTAL_MB}MB (public/videos).`,
  );
}

if (overImageBudget.length > 0) {
  errors.push(`Found ${overImageBudget.length} image files above ${MAX_IMAGE_FILE_MB}MB budget.`);
}

if (overVideoBudget.length > 0) {
  errors.push(`Found ${overVideoBudget.length} video files above ${MAX_VIDEO_FILE_MB}MB budget.`);
}

console.log("Media budget report");
console.log(`- Images: ${imageFiles.length} files, ${imagesTotalMb}MB total`);
console.log(`- Videos: ${videoFiles.length} files, ${videosTotalMb}MB total`);

printTopFiles("images", imageFiles);
printTopFiles("videos", videoFiles);

if (overImageBudget.length > 0) {
  console.log("\nImage files over budget:");
  overImageBudget.slice(0, 20).forEach((file) => {
    console.log(`- ${asRelative(file.path)} (${file.sizeMb}MB)`);
  });
}

if (overVideoBudget.length > 0) {
  console.log("\nVideo files over budget:");
  overVideoBudget.slice(0, 20).forEach((file) => {
    console.log(`- ${asRelative(file.path)} (${file.sizeMb}MB)`);
  });
}

if (errors.length > 0) {
  console.error("\nMedia budget validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("\nMedia budget validation passed.");
