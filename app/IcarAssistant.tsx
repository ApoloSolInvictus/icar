"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Lux Aeterna. Soy el asistente iCar IA. Puede preguntarme por carga, bateria 12V, mantenimiento, llaves, pantalla, sensores, repuestos o mejoras para ICAR 03, V23 y V27.",
  },
];

const examples = [
  "Mi pistola de carga no sale del puerto",
  "Que debo revisar si falla la bateria de 12V?",
  "Que accesorios convienen para un ICAR 03 Lux?",
];

export function IcarAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [status, setStatus] = useState("Listo para consultar.");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  async function speak(text: string) {
    if (!voiceEnabled) return;

    try {
      const response = await fetch("/api/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        setStatus("Voz pendiente: configure OPENAI_API_KEY en Vercel.");
        return;
      }

      const blob = await response.blob();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      const nextUrl = URL.createObjectURL(blob);
      setAudioUrl(nextUrl);
      const audio = new Audio(nextUrl);
      await audio.play();
      setStatus("Respuesta de voz reproducida.");
    } catch {
      setStatus("No se pudo reproducir la voz en este navegador.");
    }
  }

  async function sendQuestion(question: string) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || isSending) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: cleanQuestion },
    ];

    setMessages(nextMessages);
    setInput("");
    setIsSending(true);
    setStatus("Consultando base iCar IA...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-10) }),
      });
      const data = (await response.json()) as {
        answer?: string;
        mode?: "openai" | "fallback";
        error?: string;
      };

      if (!response.ok && !data.answer) {
        throw new Error(data.error ?? "No fue posible responder.");
      }

      const answer =
        data.answer ??
        "No pude generar una respuesta completa. Intente reformular la consulta.";
      setMessages((current) => [...current, { role: "assistant", content: answer }]);
      setStatus(
        data.mode === "fallback"
          ? "Modo demo: falta OPENAI_API_KEY en Vercel."
          : "Respuesta lista.",
      );
      await speak(answer);
    } catch {
      const answer =
        "Tuve un problema al consultar la IA. Revise la configuracion de Vercel y vuelva a intentar.";
      setMessages((current) => [...current, { role: "assistant", content: answer }]);
      setStatus("Error de conexion con el asistente.");
    } finally {
      setIsSending(false);
    }
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendQuestion(input);
  }

  async function toggleRecording() {
    if (isRecording) {
      recorderRef.current?.stop();
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("Este navegador no permite grabar audio.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        setIsRecording(false);
        setStatus("Transcribiendo pregunta...");

        try {
          const audio = new Blob(chunksRef.current, { type: "audio/webm" });
          const formData = new FormData();
          formData.append("audio", audio, "pregunta-icar.webm");
          const response = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });
          const data = (await response.json()) as { text?: string; error?: string };

          if (!response.ok || !data.text) {
            setStatus(data.error ?? "No se pudo transcribir el audio.");
            return;
          }

          setInput(data.text);
          await sendQuestion(data.text);
        } catch {
          setStatus("No se pudo enviar el audio.");
        }
      };

      recorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setStatus("Grabando pregunta por voz...");
    } catch {
      setStatus("Permiso de microfono rechazado o no disponible.");
    }
  }

  return (
    <section className="chat-panel" aria-label="Asistente iCar IA">
      <div className="chat-header">
        <div>
          <span>Asistente tecnico</span>
          <strong>iCar IA</strong>
        </div>
        <button
          aria-pressed={voiceEnabled}
          className={voiceEnabled ? "voice-toggle active" : "voice-toggle"}
          onClick={() => setVoiceEnabled((value) => !value)}
          type="button"
        >
          Voz {voiceEnabled ? "on" : "off"}
        </button>
      </div>

      <div className="message-list" ref={scrollRef}>
        {messages.map((message, index) => (
          <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
            <span>{message.role === "user" ? "Usted" : "iCar IA"}</span>
            <p>{message.content}</p>
          </article>
        ))}
        {isSending ? (
          <article className="message assistant thinking">
            <span>iCar IA</span>
            <p>Analizando consulta...</p>
          </article>
        ) : null}
      </div>

      <div className="suggestions" aria-label="Preguntas sugeridas">
        {examples.map((example) => (
          <button key={example} onClick={() => sendQuestion(example)} type="button">
            {example}
          </button>
        ))}
      </div>

      <form className="chat-form" onSubmit={submitForm}>
        <button
          aria-label={isRecording ? "Detener grabacion" : "Preguntar por voz"}
          className={isRecording ? "mic-button recording" : "mic-button"}
          onClick={toggleRecording}
          type="button"
        >
          {isRecording ? "Stop" : "Mic"}
        </button>
        <textarea
          aria-label="Escriba su pregunta sobre el iCar"
          onChange={(event) => setInput(event.target.value)}
          placeholder="Escriba o dicte su pregunta sobre carga, fallas, mantenimiento, partes o extras..."
          rows={3}
          value={input}
        />
        <button className="send-button" disabled={isSending || !input.trim()} type="submit">
          Enviar
        </button>
      </form>

      <p className="chat-status">{status}</p>
    </section>
  );
}
