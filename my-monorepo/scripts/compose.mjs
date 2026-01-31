#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
);

function fileExists(relPath) {
  try {
    return fs.existsSync(path.resolve(repoRoot, relPath));
  } catch {
    return false;
  }
}

function printHelpAndExit(code = 0) {
  const msg = `
Usage:
  pnpm compose:<stack> <action> [-- <extra docker compose args>]

Stacks:
  dev     Uses infrastructure/compose/dev.yml
          Optional: pass --expose to also include dev.expose.yml
  prod    Uses infrastructure/compose/production.local.yml + --env-file .env.prod.local
  server  Uses infrastructure/compose/production.server.yml
    Optional: if .env exists in repo root, it will be used as --env-file .env
    Optional (local): if .env.server.local exists and .env does not, it will be used as --env-file .env.server.local
      Safety: server stack is disabled by default in this repo; to run it anyway use: ALLOW_SERVER_STACK=1 node scripts/compose.mjs server ...

Actions (shortcuts):
  up        -> up -d --remove-orphans (dev/prod also adds --build)
  rebuild   -> up -d --build --force-recreate --remove-orphans
  down      -> down
  logs      -> logs -f --tail=100
  migrate   -> run --rm migrate
  pull      -> pull
  ps        -> ps

Examples:
  pnpm compose:dev up
  pnpm compose:dev up -- --build
  pnpm compose:dev up --expose
  pnpm compose:prod migrate
  pnpm compose:server pull
`;
  // eslint-disable-next-line no-console
  console.log(msg.trimStart());
  process.exit(code);
}

function run(cmd, args, { cwd = repoRoot } = {}) {
  const result = spawnSync(cmd, args, { stdio: "inherit", cwd });
  if (result.error) {
    // eslint-disable-next-line no-console
    console.error(result.error);
    process.exit(1);
  }
  process.exit(result.status ?? 1);
}

function runDockerCheck(mode) {
  const dockerCheckPath = path.resolve(repoRoot, "scripts/docker-check.mjs");
  if (!fs.existsSync(dockerCheckPath)) return;

  const node = process.execPath;
  const result = spawnSync(node, [dockerCheckPath, mode], {
    stdio: "inherit",
    cwd: repoRoot,
  });
  if ((result.status ?? 1) !== 0) process.exit(result.status ?? 1);
}

const argv = process.argv.slice(2);
if (argv.includes("-h") || argv.includes("--help")) {
  printHelpAndExit(0);
}

const stack = argv[0];
if (!stack) printHelpAndExit(1);

if (stack === "server" && process.env.ALLOW_SERVER_STACK !== "1") {
  // eslint-disable-next-line no-console
  console.error(
    [
      "The 'server' compose stack is disabled by default (to avoid accidentally pulling GHCR images during local development).",
      "",
      "If you really want to run it locally (prod reproduction), opt-in explicitly:",
      "  ALLOW_SERVER_STACK=1 node scripts/compose.mjs server up",
      "",
      "Otherwise, for local testing use:",
      "  pnpm compose:prod up",
    ].join("\n"),
  );
  process.exit(1);
}

const action = argv[1] ?? "up";

// Support: pnpm compose:dev up --expose -- --some-flag
const extraSeparatorIndex = argv.indexOf("--");
const rawFlags =
  extraSeparatorIndex === -1
    ? argv.slice(2)
    : argv.slice(2, extraSeparatorIndex);
const passthrough =
  extraSeparatorIndex === -1 ? [] : argv.slice(extraSeparatorIndex + 1);

const hasFlag = (name) => rawFlags.includes(name);

const stacks = {
  dev: {
    files: ["infrastructure/compose/dev.yml"],
    extraFiles: hasFlag("--expose")
      ? ["infrastructure/compose/dev.expose.yml"]
      : [],
    envFile: null,
    dockerCheck: "strict",
  },
  prod: {
    files: ["infrastructure/compose/production.local.yml"],
    extraFiles: [],
    envFile: ".env.prod.local",
    dockerCheck: "strict",
  },
  server: {
    files: ["infrastructure/compose/production.server.yml"],
    extraFiles: [],
    envFile: fileExists(".env")
      ? ".env"
      : fileExists(".env.server.local")
        ? ".env.server.local"
        : null,
    dockerCheck: "warn",
  },
};

const cfg = stacks[stack];
if (!cfg) {
  // eslint-disable-next-line no-console
  console.error(`Unknown stack: ${stack}`);
  printHelpAndExit(1);
}

if (cfg.dockerCheck) runDockerCheck(cfg.dockerCheck);

if (stack === "prod" && !fileExists(cfg.envFile)) {
  // eslint-disable-next-line no-console
  console.error(
    "Missing .env.prod.local. Create it from .env.prod.local.example (copy) before running local prod compose.",
  );
  process.exit(1);
}

const composeArgs = ["compose"];
for (const f of [...cfg.files, ...cfg.extraFiles]) {
  composeArgs.push("-f", f);
}
if (cfg.envFile) {
  composeArgs.push("--env-file", cfg.envFile);
}

const actionMap = {
  up:
    stack === "server"
      ? ["up", "-d", "--remove-orphans"]
      : ["up", "-d", "--build", "--remove-orphans"],
  rebuild: ["up", "-d", "--build", "--force-recreate", "--remove-orphans"],
  down: ["down"],
  logs: ["logs", "-f", "--tail=100"],
  migrate: ["run", "--rm", "migrate"],
  pull: ["pull"],
  ps: ["ps"],
};

const finalActionArgs = actionMap[action] ?? [action];

// Filter out wrapper-only flags so they don't hit docker compose.
const wrapperOnlyFlags = new Set(["--expose"]);
const forwardedFlags = rawFlags.filter((f) => !wrapperOnlyFlags.has(f));

run("docker", [
  ...composeArgs,
  ...finalActionArgs,
  ...forwardedFlags,
  ...passthrough,
]);
