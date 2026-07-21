# Centro iCar IA

Sitio de soporte para propietarios de ICAR 03, ICAR V23 e ICAR V27, construido
con Next.js para Vercel. La experiencia ya no es una landing de venta: ahora es
un centro de ayuda con chatbot OpenAI, consulta por microfono y respuesta con
voz masculina.

## Requisitos

- Node.js `>=22.13.0`
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

Sin `OPENAI_API_KEY`, el chat funciona en modo demo con respuestas locales. La
transcripcion de voz y la voz generada requieren la clave en el entorno.

## Variables de entorno

En Vercel, agregue estas variables en Project Settings -> Environment Variables:

- `OPENAI_API_KEY`: requerida para chat IA real, microfono y voz.
- `OPENAI_MODEL`: opcional. Valor por defecto: `gpt-5.6-luna`.
- `OPENAI_TRANSCRIBE_MODEL`: opcional. Valor por defecto: `gpt-4o-mini-transcribe`.
- `OPENAI_TTS_MODEL`: opcional. Valor por defecto: `gpt-4o-mini-tts`.
- `OPENAI_TTS_VOICE`: opcional. Valor por defecto: `onyx`.

## Build de produccion

```bash
npm run build
npm run start
```

## Despliegue en Vercel

Este repo esta preparado para Vercel como una app Next.js estandar.

1. Importa `ApoloSolInvictus/icar` en Vercel.
2. Usa estos valores:
   - Framework Preset: `Next.js`
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: vacio, Vercel lo detecta automaticamente
3. Agrega `OPENAI_API_KEY` para activar las respuestas reales y voz.

Tambien puedes desplegar desde CLI:

```bash
npm i -g vercel
vercel
vercel --prod
```

## Estructura principal

- `app/page.tsx`: pagina principal del Centro iCar IA.
- `app/IcarAssistant.tsx`: interfaz de chat, microfono y voz.
- `app/api/chat/route.ts`: proxy server-side para OpenAI Responses API.
- `app/api/transcribe/route.ts`: transcripcion de audio a texto.
- `app/api/speech/route.ts`: respuesta de texto a voz.
- `app/lib/icarKnowledge.ts`: base inicial de conocimiento para el asistente.
- `public/assets/models/`: imagenes esenciales de ICAR 03, V23 y V27.

## Fuentes base

El contenido esta inspirado en el manual `Manual iCar-03 25 Agosto 2024.pdf` y
en la estructura publica de Centro ICAR: soporte por modelo, preguntas frecuentes,
tienda de repuestos/accesorios y descargas de fichas tecnicas.

Las llamadas a OpenAI se hacen desde rutas API del servidor para no exponer la
clave en el navegador.
