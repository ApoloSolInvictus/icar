import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Configure OPENAI_API_KEY en Vercel para usar el microfono." },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const audio = formData.get("audio");

  if (!(audio instanceof File)) {
    return NextResponse.json(
      { error: "Envie un archivo de audio valido." },
      { status: 400 },
    );
  }

  const openaiForm = new FormData();
  openaiForm.append("file", audio, audio.name || "pregunta-icar.webm");
  openaiForm.append(
    "model",
    process.env.OPENAI_TRANSCRIBE_MODEL ?? "gpt-4o-mini-transcribe",
  );
  openaiForm.append("language", "es");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: openaiForm,
  });

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json(
      { error: `OpenAI no pudo transcribir el audio: ${detail.slice(0, 280)}` },
      { status: response.status },
    );
  }

  const payload = (await response.json()) as { text?: string };
  return NextResponse.json({ text: payload.text ?? "" });
}
