#!/usr/bin/env node

import { execSync } from "node:child_process";
import process from "node:process";

function run(command, { inherit = false } = {}) {
  try {
    if (inherit) {
      execSync(command, { stdio: "inherit" });
      return "";
    }
    return execSync(command, {
      stdio: ["ignore", "pipe", "pipe"],
      encoding: "utf8",
    }).trim();
  } catch {
    return "";
  }
}

function hasCommand(cmd) {
  return run(`command -v ${cmd}`) !== "";
}

function isRoot() {
  return typeof process.getuid === "function" && process.getuid() === 0;
}

function hasPasswordlessSudo() {
  if (!hasCommand("sudo")) return false;
  try {
    execSync("sudo -n true", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function canSudoInteractively() {
  // If this is running in a terminal, sudo can prompt for a password.
  // If stdin isn't a TTY, prompting will fail/hang; treat as not available.
  return hasCommand("sudo") && !!process.stdin.isTTY;
}

function systemctl(args, { allowSudo = false } = {}) {
  const command = `systemctl ${args}`;
  if (isRoot()) return run(command);
  if (allowSudo && hasPasswordlessSudo()) return run(`sudo -n ${command}`);
  return "";
}

function dockerServerInfo() {
  return run(
    "docker version --format 'server={{.Server.Version}} api={{.Server.APIVersion}}' 2>/dev/null",
  );
}

function printHelp() {
  console.log(
    [
      "Usage:",
      "  node scripts/docker-check.mjs [strict|warn|cleanup|help]",
      "",
      "Commands:",
      "  strict   Exit with code 1 if both system Docker and docker-snap daemons are active.",
      "  warn     Print warning but exit 0 (useful for logs/down).",
      "  cleanup  Best-effort cleanup of local dev compose containers; can auto-stop snap docker if run with sudo.",
      "  help     Show this help.",
      "",
      "Environment:",
      "  SKIP_DOCKER_CHECK=1  Skip all checks/cleanup.",
    ].join("\n"),
  );
}

const command = (process.argv[2] ?? "strict").toLowerCase();
const skip = process.env.SKIP_DOCKER_CHECK === "1";

if (skip) process.exit(0);

// If systemctl isn't present (e.g. non-systemd env), don't block.
const hasSystemctl = hasCommand("systemctl");
if (!hasSystemctl) process.exit(0);

if (command === "help" || command === "-h" || command === "--help") {
  printHelp();
  process.exit(0);
}

const dockerActive = run("systemctl is-active docker.service") === "active";
const snapDockerActive =
  run("systemctl is-active snap.docker.dockerd.service") === "active";

function twoDaemonsMessage() {
  const server = dockerServerInfo();
  return [
    "❌ Two Docker daemons are active: docker.service and snap.docker.dockerd.service.",
    "This commonly causes stuck containers and errors like: cannot stop container: permission denied.",
    server ? `Current docker server: ${server}` : "",
    "",
    "Recommended (local dev): keep a single Docker daemon. Usually keep docker.service and disable the snap daemon:",
    "  sudo systemctl disable --now snap.docker.dockerd.service",
    "  (optional) sudo snap remove docker",
    "  sudo systemctl restart docker",
    "",
    "You can bypass this check with: SKIP_DOCKER_CHECK=1 ...",
  ]
    .filter(Boolean)
    .join("\n");
}

function cleanupDevCompose() {
  const composeFile = "infrastructure/compose/dev.yml";
  const containers = [
    "my-nginx",
    "my-web",
    "my-backend",
    "my-redis",
    "my-postgres",
    "my-migrate",
  ];

  // If both daemons are active, try to stop snap daemon first (requires root or passwordless sudo).
  if (dockerActive && snapDockerActive) {
    const canElevate =
      isRoot() || hasPasswordlessSudo() || canSudoInteractively();
    if (!canElevate) {
      console.error(twoDaemonsMessage());
      console.error(
        "\nCleanup requires sudo to stop the snap daemon. Run:\n  sudo node scripts/docker-check.mjs cleanup",
      );
      process.exit(1);
    }

    console.log("Stopping snap Docker daemon (snap.docker.dockerd.service)...");
    if (isRoot()) {
      run("systemctl stop snap.docker.dockerd.service", { inherit: true });
    } else if (hasPasswordlessSudo()) {
      run("sudo -n systemctl stop snap.docker.dockerd.service", {
        inherit: true,
      });
    } else {
      run("sudo systemctl stop snap.docker.dockerd.service", { inherit: true });
    }
    console.log("Restarting system Docker daemon (docker.service)...");
    if (isRoot()) {
      run("systemctl restart docker.service", { inherit: true });
    } else if (hasPasswordlessSudo()) {
      run("sudo -n systemctl restart docker.service", { inherit: true });
    } else {
      run("sudo systemctl restart docker.service", { inherit: true });
    }
    console.log("Restarting Docker socket (docker.socket)...");
    if (isRoot()) {
      run("systemctl restart docker.socket", { inherit: true });
    } else if (hasPasswordlessSudo()) {
      run("sudo -n systemctl restart docker.socket", { inherit: true });
    } else {
      run("sudo systemctl restart docker.socket", { inherit: true });
    }

    // Give the daemon a moment to recreate /run/docker.sock and accept connections.
    for (let i = 0; i < 10; i += 1) {
      const ok =
        run(
          "docker version --format 'server={{.Server.Version}}' 2>/dev/null",
        ) !== "";
      if (ok) break;
      run("sleep 0.3", { inherit: false });
    }
  }

  console.log("Running docker compose down (best-effort)...");
  run(`docker compose -f ${composeFile} down --remove-orphans`, {
    inherit: true,
  });

  console.log("Removing known dev containers (best-effort)...");
  run(`docker rm -f ${containers.join(" ")}`, { inherit: true });

  console.log(
    "Done. If something is still stuck, rebooting usually clears orphaned shim processes.",
  );
}

if (command === "cleanup") {
  cleanupDevCompose();
  process.exit(0);
}

if (dockerActive && snapDockerActive) {
  const message = twoDaemonsMessage();

  if (command === "warn") {
    console.warn(message);
    process.exit(0);
  }

  console.error(message);
  process.exit(1);
}
