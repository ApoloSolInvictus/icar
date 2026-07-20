import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps Vercel/Next scripts configured", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.scripts.start, "next start");
  assert.equal(packageJson.dependencies.next, "16.2.6");
});

test("documents the Vercel deployment path", async () => {
  const [readme, vercelConfig] = await Promise.all([
    readFile(new URL("../README.md", import.meta.url), "utf8"),
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
  ]);

  assert.match(readme, /Despliegue en Vercel/);
  assert.match(readme, /Framework Preset: `Next\.js`/);
  assert.equal(JSON.parse(vercelConfig).framework, "nextjs");
});
