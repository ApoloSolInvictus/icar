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
  assert.match(readme, /OPENAI_API_KEY/);
  assert.equal(JSON.parse(vercelConfig).framework, "nextjs");
});

test("ships the OpenAI support assistant routes", async () => {
  const [page, assistant, chatRoute, transcribeRoute, speechRoute] =
    await Promise.all([
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/IcarAssistant.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/api/chat/route.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/api/transcribe/route.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/api/speech/route.ts", import.meta.url), "utf8"),
    ]);

  assert.match(page, /Centro iCar IA/);
  assert.match(assistant, /MediaRecorder/);
  assert.match(chatRoute, /responses/);
  assert.match(transcribeRoute, /audio\/transcriptions/);
  assert.match(speechRoute, /audio\/speech/);
});
