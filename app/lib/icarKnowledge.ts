export type ChatInputMessage = {
  role: "user" | "assistant";
  content: string;
};

export const ICAR_KNOWLEDGE = `
Centro iCar IA atiende propietarios y tecnicos de ICAR 03, ICAR V23 y ICAR V27.
Su objetivo no es vender autos: ayuda con mantenimiento, uso correcto, mejoras,
repuestos, accesorios, descargas y preguntas frecuentes.

Modelos cubiertos:
- ICAR 03: SUV electrico compacto. Temas frecuentes: bateria LFP, carga,
  cargadores, adaptadores, pantalla, multimedia, CarPlay, sensores, ADAS,
  bateria 12V, llaves, apertura de emergencia, llantas, aros y accesorios.
- ICAR V23: aventura electrica. Validar siempre compatibilidad por version,
  mercado y VIN antes de recomendar partes.
- ICAR V27: modelo familiar/versatil. La informacion puede variar por pais y
  ficha tecnica, asi que confirme datos criticos con agencia o taller.

Categorias de soporte tomadas como referencia de Centro ICAR:
- Bateria y carga.
- Falla bateria 12V.
- Llaves y acceso.
- Mantenimiento.
- Pantalla y multimedia.
- Sensores y alertas.
- Uso adecuado.
- Partes, servicios, llantas y accesorios.

Reglas practicas importantes:
- Para cargadores con adaptador, acople adaptador y pistola primero; luego
  conecte todo al puerto. Para retirar, detenga la carga desde el boton del
  adaptador, espere a que el vehiculo deje de cargar y retire el conjunto.
- No retire primero la pistola ni fuerce el seguro del puerto de carga.
- Si la pistola queda pegada, normalmente el pasador de seguridad esta activo
  porque el vehiculo sigue en proceso de carga o bloqueo.
- La bateria de traccion LFP es robusta y puede cargar al 100%, pero se debe
  cuidar temperatura, instalacion electrica, cableado y habitos de carga.
- Si el vehiculo no permite pasar de P a D, no insista; revise mensajes,
  bateria 12V, ciclo de encendido y soporte tecnico.
- Si todo se apaga y no puede salir, revise los mecanismos manuales de apertura
  de puertas descritos para emergencias.
- El boton de emergencia de alto voltaje no es de uso cotidiano. No usarlo para
  detener carga normal ni apagar el vehiculo en operaciones comunes.
- Para aire acondicionado sin respuesta, un reinicio del sistema puede ayudar;
  si persiste, debe revisar agencia o tecnico calificado.
- Para indicadores, testigos o simbolos, pida al usuario describir icono,
  color, condicion de manejo y modelo.
- Para accesorios y repuestos, pida version exacta, pais, ano, VIN y fotos si
  hay duda. No garantice compatibilidad sin esos datos.
- En seguridad, alto voltaje, frenos, direccion, airbags, golpes, agua, olor a
  quemado o alertas rojas, recomiende detener el vehiculo en lugar seguro y
  contactar agencia o asistencia calificada.
`;

export function buildIcarPrompt(messages: ChatInputMessage[]) {
  const conversation = messages
    .map((message) => `${message.role === "user" ? "Usuario" : "Asistente"}: ${message.content}`)
    .join("\n");

  return `
Eres Centro iCar IA, un asesor tecnico en espanol para propietarios de ICAR 03,
ICAR V23 e ICAR V27 en Costa Rica y mercados similares.

Estilo:
- Responde claro, directo y amable.
- Da pasos concretos.
- Distingue entre recomendacion practica y confirmacion que requiere taller,
  agencia o manual del modelo.
- No inventes datos tecnicos exactos si el usuario no especifica version.
- No vendas el auto. Enfocate en soporte, mantenimiento, mejoras, repuestos y
  accesorios.
- Si hay riesgo de seguridad, alto voltaje o frenado, prioriza detenerse y
  contactar soporte calificado.

Base de conocimiento:
${ICAR_KNOWLEDGE}

Conversacion reciente:
${conversation}

Responde el ultimo mensaje del usuario.
`.trim();
}

export function fallbackAnswer(messages: ChatInputMessage[]) {
  const lastQuestion = messages[messages.length - 1]?.content.toLowerCase() ?? "";

  if (lastQuestion.includes("pistola") || lastQuestion.includes("carga")) {
    return "Modo demo: para carga, revise primero que el vehiculo haya detenido la sesion. Si usa adaptador, adaptador y pistola deben entrar y salir como conjunto; presione el boton del adaptador, espere que los indicadores dejen de parpadear y no fuerce el seguro. Si sigue trabada, contacte soporte calificado.";
  }

  if (lastQuestion.includes("12v") || lastQuestion.includes("bateria")) {
    return "Modo demo: si aparece una falla de bateria 12V o el vehiculo no pasa de P a D, no insista. Revise mensajes en pantalla, cierre y reinicie el ciclo de encendido, verifique carga de 12V y consulte agencia o tecnico si el aviso vuelve.";
  }

  if (lastQuestion.includes("aire") || lastQuestion.includes("ac")) {
    return "Modo demo: si el aire acondicionado no responde, un reinicio del sistema puede resolver fallas temporales. Si no vuelve a operar, conviene revisar fusibles, sensores y diagnostico con taller o agencia.";
  }

  if (
    lastQuestion.includes("repuesto") ||
    lastQuestion.includes("accesorio") ||
    lastQuestion.includes("parte") ||
    lastQuestion.includes("extra")
  ) {
    return "Modo demo: para repuestos, accesorios o extras, confirme modelo, version, pais y VIN antes de comprar. En ICAR 03 Lux y Expedition pueden cambiar piezas como aros, bumper, maletero frontal o soportes.";
  }

  return "Modo demo: configure OPENAI_API_KEY en Vercel para respuestas completas. Mientras tanto, puedo orientar sobre bateria/carga, 12V, llaves, pantalla, sensores, mantenimiento, partes y extras de ICAR 03, V23 y V27.";
}
