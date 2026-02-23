#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";

const repoRoot = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
);
const webPublicDir = path.resolve(repoRoot, "apps/web/public");

const sourceSvgPath = path.resolve(webPublicDir, "favicon.svg");

function ensureFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${filePath}`);
  }
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content);
  // eslint-disable-next-line no-console
  console.log(`✓ wrote ${path.relative(repoRoot, filePath)}`);
}

function renderPngFromSvg(svgString, size) {
  const resvg = new Resvg(svgString, {
    fitTo: {
      mode: "width",
      value: size,
    },
  });
  const rendered = resvg.render();
  return rendered.asPng();
}

try {
  ensureFileExists(sourceSvgPath);
  const svg = fs.readFileSync(sourceSvgPath, "utf8");

  const outputs = [
    { file: "favicon-16x16.png", size: 16 },
    { file: "favicon-32x32.png", size: 32 },
    { file: "apple-touch-icon.png", size: 180 },
    { file: "icon-192.png", size: 192 },
    { file: "icon-512.png", size: 512 },
  ];

  const pngBuffers = new Map();

  for (const { file, size } of outputs) {
    const buffer = renderPngFromSvg(svg, size);
    pngBuffers.set(size, buffer);
    writeFile(path.resolve(webPublicDir, file), buffer);
  }

  const icoBuffer = await pngToIco([pngBuffers.get(16), pngBuffers.get(32)]);
  writeFile(path.resolve(webPublicDir, "favicon.ico"), icoBuffer);

  const manifest = {
    name: "Adam Zagórski",
    short_name: "Zagórski",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };

  writeFile(
    path.resolve(webPublicDir, "site.webmanifest"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  // eslint-disable-next-line no-console
  console.log("Done.");
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
