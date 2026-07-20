import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const [requestedCommand, ...args] = process.argv.slice(2);

if (!requestedCommand) {
  console.error("Missing command");
  process.exit(1);
}

const localCommand =
  process.platform === "win32"
    ? path.join("node_modules", ".bin", `${requestedCommand}.cmd`)
    : path.join("node_modules", ".bin", requestedCommand);
const command = existsSync(localCommand) ? localCommand : requestedCommand;

const child = spawn(command, args, {
  env: { ...process.env, WRANGLER_LOG_PATH: ".wrangler/wrangler.log" },
  shell: true,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
