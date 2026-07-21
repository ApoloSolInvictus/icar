import { IcarAssistant } from "./IcarAssistant";

const models = [
  {
    name: "ICAR 03",
    image: "/assets/models/icar-03-real.webp",
    focus: "SUV 100% electrico",
    detail: "Carga, bateria LFP, multimedia, ADAS, 12V y mantenimiento diario.",
  },
  {
    name: "ICAR V23",
    image: "/assets/models/icar-v23.png",
    focus: "Aventura electrica",
    detail: "Soporte por compatibilidad, accesorios, llantas, carga y uso correcto.",
  },
  {
    name: "ICAR V27",
    image: "/assets/models/icar-v27.png",
    focus: "Espacio y versatilidad",
    detail: "Ficha tecnica, partes, alertas, mejoras y consultas por modelo.",
  },
];

const focusAreas = [
  "Bateria y carga",
  "Bateria 12V",
  "Llaves y acceso",
  "Mantenimiento",
  "Pantalla y multimedia",
  "Sensores y alertas",
  "Uso adecuado",
  "Partes y extras",
];

const quickGuides = [
  {
    title: "Carga segura",
    text: "Conecte adaptador y pistola como una sola pieza, detenga la carga desde el adaptador y espere a que los indicadores dejen de parpadear antes de retirar.",
  },
  {
    title: "Bateria LFP",
    text: "Puede trabajar muy bien con cargas altas, pero conviene cuidar temperatura, instalacion electrica y ciclos de calibracion cuando aplique.",
  },
  {
    title: "Salida de emergencia",
    text: "Si el sistema se apaga, revise el mecanismo manual de apertura de puertas y no fuerce controles electricos bloqueados.",
  },
  {
    title: "Partes y mejoras",
    text: "Antes de comprar bumpers, aros, maleteros, porta celulares, tiendas o accesorios, confirme modelo, version y compatibilidad por VIN.",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="topbar" aria-label="Navegacion principal">
        <a className="brand" href="#inicio">
          Centro iCar IA
        </a>
        <div>
          <a href="#modelos">Modelos</a>
          <a href="#asistente">Chat IA</a>
          <a href="#guias">Guias</a>
        </div>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Soporte inteligente para propietarios ICAR</p>
          <h1>Centro iCar IA</h1>
          <p className="hero-lede">
            Pregunte por mantenimiento, carga, fallas, repuestos, accesorios y
            mejoras para ICAR 03, V23 y V27. El sitio esta pensado como una
            mesa de ayuda sencilla, oscura y precisa, no como una pagina de venta.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#asistente">
              Abrir asistente
            </a>
            <a className="secondary-action" href="#guias">
              Ver temas base
            </a>
          </div>
        </div>

        <div className="hero-vehicle" aria-label="Auto de muestra ICAR">
          <div className="signal-card">
            <span>IA activa</span>
            <strong>Texto + voz</strong>
          </div>
          <img alt="ICAR 03 completo de muestra" src="/assets/models/icar-03-real.webp" />
          <div className="telemetry">
            <span>Modelo</span>
            <strong>ICAR 03</strong>
            <span>Base de consulta</span>
            <strong>Soporte, manual y Centro ICAR</strong>
          </div>
        </div>
      </section>

      <section className="models-section" id="modelos">
        <div className="section-heading">
          <p className="eyebrow">Modelos actuales</p>
          <h2>Una experiencia para dueños, tecnicos y compradores de partes.</h2>
        </div>

        <div className="model-grid">
          {models.map((model) => (
            <article key={model.name} className="model-card">
              <img alt={`${model.name} de referencia`} src={model.image} />
              <div>
                <span>{model.focus}</span>
                <h3>{model.name}</h3>
                <p>{model.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="assistant-shell" id="asistente">
        <div className="assistant-context">
          <p className="eyebrow">Chatbot OpenAI</p>
          <h2>Pregunte como hablaria con un asesor tecnico.</h2>
          <p>
            El asistente responde con contexto de soporte ICAR, recomendaciones
            practicas del manual y una ruta clara: que revisar, que evitar y
            cuando consultar agencia o taller calificado.
          </p>

          <div className="focus-grid" aria-label="Temas que cubre el asistente">
            {focusAreas.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <IcarAssistant />
      </section>

      <section className="guides-section" id="guias">
        <div className="section-heading">
          <p className="eyebrow">Base rapida</p>
          <h2>El contenido queda preparado para ampliar la base de conocimiento.</h2>
        </div>

        <div className="guide-grid">
          {quickGuides.map((guide) => (
            <article key={guide.title}>
              <h3>{guide.title}</h3>
              <p>{guide.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="source-band" aria-label="Fuentes base">
        <div>
          <span>Fuentes base</span>
          <strong>Manual iCar-03 + Centro ICAR + documentacion OpenAI</strong>
        </div>
        <p>
          La IA esta lista para funcionar cuando agregue OPENAI_API_KEY en
          Vercel. Sin clave, el sitio conserva una respuesta demo para validar
          la interfaz, pero el chat real y la voz quedan desactivados.
        </p>
      </section>

      <footer>
        <strong>Centro iCar IA</strong>
        <span>Soporte, mantenimiento, mejoras, repuestos y extras para la familia ICAR.</span>
      </footer>
    </main>
  );
}
