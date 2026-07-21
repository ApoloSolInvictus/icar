import { Gallery } from "./Gallery";

const heroImages = [
  "/assets/web-photos/real-icar-03-front-right.webp",
  "/assets/web-photos/official-icaur-03-screen.webp",
  "/assets/web-photos/real-icar-03-jaecoo-interior.webp",
];

const specs = [
  ["Largo", "4.406 mm"],
  ["Ancho", "1.910 mm"],
  ["Alto", "1.715 mm"],
  ["Distancia entre ejes", "2.715 mm"],
  ["Plazas", "5"],
  ["Velocidad máxima", "150 km/h"],
  ["Potencia máxima", "135 kW en versiones S56A/S56B"],
  ["Par máximo", "220 Nm en versiones S56A/S56B"],
  ["Cargador a bordo", "6,6 kW"],
  ["Neumáticos", "225/60R18, 225/55R19 o 235/60R18 según versión"],
];

const routeStops = [
  {
    title: "Carga segura",
    text: "El adaptador y la pistola entran juntos y salen juntos. Para detener la carga, se oprime el botón del adaptador y se verifica que el iCar deje de cargar.",
  },
  {
    title: "Batería LFP",
    text: "Litio Ferro Fosfato, orientada a durabilidad y seguridad. El manual recomienda calibrar una vez al mes bajando cerca del 10% y cargando al 100%.",
  },
  {
    title: "Conducción diaria",
    text: "Modo Custom para una respuesta más suave, regeneración configurable y una conducción menos brusca en ciudad, pendientes y ruta mixta.",
  },
  {
    title: "Cabina conectada",
    text: "Pantalla central, CarPlay, mapas, GPS, brújula, carga inalámbrica y ajustes rápidos para confort, asistencia y entretenimiento.",
  },
  {
    title: "Seguridad real",
    text: "Airbags, ABS, ESC, cinturones, apertura manual de emergencia y recomendaciones prácticas para Costa Rica.",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="topbar" aria-label="Navegación principal">
        <a className="brand" href="#inicio">
          iCar-03
        </a>
        <div>
          <a href="#uso">Uso</a>
          <a href="#venta">Venta</a>
          <a href="#specs">Specs</a>
          <a href="#galeria">Galería</a>
        </div>
      </nav>

      <section className="hero map-surface" id="inicio">
        <div className="route-line one" />
        <div className="route-line two" />
        <div className="pin pin-a">Carga</div>
        <div className="pin pin-b">LFP</div>
        <div className="pin pin-c">GPS</div>

        <div className="hero-copy">
          <p className="eyebrow">Landing Vercel + galería real</p>
          <h1>iCar-03</h1>
          <p className="hero-lede">
            SUV eléctrico compacto con batería LFP, cabina conectada, guía de
            carga para Costa Rica y fotos reales del vehículo desde el primer
            pantallazo.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#venta">
              Ver propuesta comercial
            </a>
            <a className="secondary-action" href="#galeria">
              Explorar imágenes
            </a>
          </div>
        </div>

        <div className="hero-showcase" aria-label="Auto de muestra iCar-03">
          <img
            className="hero-car"
            alt="iCar-03 real circulando en ciudad"
            src="/assets/web-photos/real-icar-03-street-front.webp"
          />
          <div className="hero-badge">
            <strong>Auto de muestra</strong>
            <span>Vista real y material oficial para venta</span>
          </div>
        </div>

        <div className="hero-board" aria-label="Resumen visual del iCar-03">
          {heroImages.map((src, index) => (
            <img
              alt={`Vista real del iCar-03 ${index + 1}`}
              key={src}
              src={src}
            />
          ))}
        </div>
      </section>

      <section className="quick-specs" aria-label="Datos destacados">
        <div>
          <strong>4.406 mm</strong>
          <span>Largo</span>
        </div>
        <div>
          <strong>150 km/h</strong>
          <span>Velocidad máxima</span>
        </div>
        <div>
          <strong>6,6 kW</strong>
          <span>Cargador a bordo</span>
        </div>
        <div>
          <strong>8 años</strong>
          <span>Batería de energía, según garantía del manual</span>
        </div>
      </section>

      <section className="route-section" id="uso">
        <div className="section-kicker">Mapa de funcionamiento</div>
        <div className="section-heading">
          <h2>Del enchufe a la ruta, el iCar se entiende por pasos.</h2>
          <p>
            El manual combina recomendaciones oficiales con observaciones reales
            de usuarios. Aquí queda ordenado como una ruta de operación.
          </p>
        </div>

        <div className="route-list">
          {routeStops.map((stop, index) => (
            <article key={stop.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{stop.title}</h3>
              <p>{stop.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-feature">
        <div>
          <div className="section-kicker">Carga del iCar-03</div>
          <h2>El punto crítico es apagar la carga antes de separar.</h2>
          <p>
            Para cargadores públicos con pistola distinta, el manual insiste en
            una regla simple: adaptador y pistola se conectan juntos al puerto,
            y también se retiran juntos. Al finalizar, el botón correcto es el
            del adaptador porque envía la señal para apagar la carga.
          </p>
          <ul className="check-list">
            <li>Verificar que las luces LED dejen de parpadear.</li>
            <li>Evitar insertar primero el adaptador y luego la pistola.</li>
            <li>No retirar primero la pistola, para evitar arco eléctrico.</li>
            <li>Preferir cargas medias o bajas para el cuidado diario.</li>
          </ul>
        </div>
        <div className="feature-images">
          <img alt="Conexión de carga del iCar-03" src="/assets/pages/manual-001.png" />
          <img alt="Adaptador de carga del iCar-03" src="/assets/pages/manual-003.png" />
        </div>
      </section>

      <section className="sales-section" id="venta">
        <div className="section-kicker">Argumento de venta</div>
        <div className="section-heading">
          <h2>Un eléctrico para vender por confianza, uso real y soporte.</h2>
          <p>
            La fortaleza del iCar-03 no es solo que sea eléctrico. Es que el
            manual aterriza la experiencia: cómo cargar, cómo cuidar la batería,
            cómo configurar la conducción y qué revisar para vivirlo con menos
            incertidumbre.
          </p>
        </div>

        <div className="sales-grid">
          <article>
            <h3>Para ciudad y escapadas</h3>
            <p>
              170 mm de distancia mínima al suelo, cinco plazas, maletero
              plegable y dimensiones compactas para moverse con soltura.
            </p>
          </article>
          <article>
            <h3>Para quien carga en casa</h3>
            <p>
              Cargador a bordo de 6,6 kW, recomendaciones de 10 A a 32 A y
              énfasis en cargas medias para alargar la vida de la batería.
            </p>
          </article>
          <article>
            <h3>Para familias</h3>
            <p>
              Airbags, cinturones, anclajes y advertencias de seguridad infantil
              presentadas con imágenes claras en el manual.
            </p>
          </article>
          <article>
            <h3>Para soporte posventa</h3>
            <p>
              Garantía de batería de energía indicada hasta 8 años o 150.000 km,
              más tablas de mantenimiento y piezas especiales.
            </p>
          </article>
        </div>
      </section>

      <section className="spec-section" id="specs">
        <div className="section-kicker">Especificaciones</div>
        <div className="section-heading">
          <h2>Datos técnicos principales del manual.</h2>
          <p>
            Las cifras provienen de la sección 9 del PDF, donde se listan
            dimensiones, peso, desempeño, motor, batería, ruedas y sistemas.
          </p>
        </div>

        <div className="spec-layout">
          <div className="spec-table">
            {specs.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="spec-pages">
            <img alt="Tabla de dimensiones del iCar-03" src="/assets/pages/spec-374.png" />
            <img alt="Tabla de batería del iCar-03" src="/assets/pages/spec-380.png" />
          </div>
        </div>
      </section>

      <section className="visual-strip" aria-label="Fotos reales del vehículo">
        {[
          "/assets/web-photos/real-icar-03-street-front.webp",
          "/assets/web-photos/real-icar-03-street-rear.webp",
          "/assets/web-photos/official-icaur-03-front.webp",
          "/assets/web-photos/official-icaur-03-screen.webp",
          "/assets/web-photos/official-icaur-03-ambient.webp",
        ].map((src, index) => (
          <img alt={`Foto real del iCar-03 ${index + 1}`} key={src} src={src} />
        ))}
      </section>

      <section className="source-section" aria-label="Fuentes de fotos web">
        <div>
          <span>Fuentes web añadidas</span>
          <strong>Wikimedia Commons + iCAUR Malaysia</strong>
        </div>
        <p>
          Se agregaron fotos reales de calle y exhibición, más recursos
          oficiales del modelo iCAUR 03, para que la landing no dependa solo de
          capturas del manual.
        </p>
      </section>

      <section className="visual-strip manual-strip" aria-label="Uso visual del manual">
        {[
          "/assets/optimized/page-248-img-01.webp",
          "/assets/optimized/page-252-img-02.webp",
          "/assets/optimized/page-074-img-01.webp",
          "/assets/optimized/page-078-img-01.webp",
          "/assets/optimized/page-088-img-02.webp",
        ].map((src, index) => (
          <img alt={`Uso visual del manual iCar-03 ${index + 1}`} key={src} src={src} />
        ))}
      </section>

      <Gallery />

      <footer>
        <strong>iCar-03</strong>
        <span>
          Sitio basado en el “Manual iCar-03 25 Agosto 2024.pdf” y sus imágenes.
        </span>
      </footer>
    </main>
  );
}
