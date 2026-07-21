import { NextResponse } from "next/server";
import {
  ChatInputMessage,
  buildIcarPrompt,
  fallbackAnswer,
} from "../../lib/icarKnowledge";

export const runtime = "nodejs";

function extractOutputText(payload: unknown) {
  if (
    payload &&
    typeof payload === "object" &&
    "output_text" in payload &&
    typeof payload.output_text === "string"
  ) {
    return payload.output_text;
  }

  if (!payload || typeof payload !== "object" || !("output" in payload)) {
    return "";
  }

  const output = (payload as { output?: unknown }).output;
  if (!Array.isArray(output)) return "";

  return output
    .flatMap((item) => {
      if (!item || typeof item !== "object" || !("content" in item)) return [];
      const content = (item as { content?: unknown }).content;
      if (!Array.isArray(content)) return [];
      return content.map((part) => {
        if (!part || typeof part !== "object" || !("text" in part)) return "";
        return typeof (part as { text?: unknown }).text === "string"
          ? (part as { text: string }).text
          : "";
      });
    })
    .join("\n")
    .trim();
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    messages?: ChatInputMessage[];
  } | null;

  const messages = (body?.messages ?? []).filter(
    (message) =>
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string",
  );

  if (!messages.length) {
    return NextResponse.json(
      { error: "Envie al menos una pregunta para el asistente." },
      { status: 400 },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      answer: fallbackAnswer(messages),
      mode: "fallback",
    });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-5.6-luna",
      input: buildIcarPrompt(messages),
      max_output_tokens: 900,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json(
      {
        answer:
          "No pude consultar OpenAI en este momento. Revise la variable OPENAI_API_KEY, el modelo configurado y los logs de Vercel.",
        error: detail.slice(0, 400),
      },
      { status: response.status },
    );
  }

  const payload = await response.json();
  const answer = extractOutputText(payload);

  return NextResponse.json({
    answer:
      answer ||
      "La IA respondio sin texto visible. Intente reformular la pregunta con mas contexto del modelo.",
    mode: "openai",
  });
}
