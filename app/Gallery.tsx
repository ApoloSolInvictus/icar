"use client";

import { useEffect, useMemo, useState } from "react";

type ManualImage = {
  src: string;
  page: number;
  image: number;
};

const filters = [
  { label: "Todo", from: 1, to: 400 },
  { label: "Carga", from: 1, to: 39 },
  { label: "Pantalla", from: 69, to: 100 },
  { label: "Seguridad", from: 244, to: 272 },
  { label: "Especificación", from: 374, to: 386 },
];

export function Gallery() {
  const [items, setItems] = useState<ManualImage[]>([]);
  const [active, setActive] = useState(filters[0]);
  const [visible, setVisible] = useState(30);

  useEffect(() => {
    fetch("/assets/gallery-manifest.json")
      .then((response) => response.json())
      .then((data: ManualImage[]) => setItems(data))
      .catch(() => setItems([]));
  }, []);

  const filtered = useMemo(
    () =>
      items.filter((item) => item.page >= active.from && item.page <= active.to),
    [active, items],
  );

  const shown = filtered.slice(0, visible);

  return (
    <section className="gallery-section" id="galeria">
      <div className="section-kicker">Galería completa</div>
      <div className="section-heading">
        <h2>Todas las imágenes del manual, listas para explorar.</h2>
        <p>
          El sitio conserva las imágenes extraídas del PDF y presenta una
          selección optimizada en las secciones principales.
        </p>
      </div>

      <div className="filter-row" aria-label="Filtros de galería">
        {filters.map((filter) => (
          <button
            className={active.label === filter.label ? "active" : ""}
            key={filter.label}
            onClick={() => {
              setActive(filter);
              setVisible(30);
            }}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="gallery-count">
        {filtered.length.toLocaleString("es-CR")} imágenes encontradas
      </div>

      <div className="manual-grid">
        {shown.map((item) => (
          <figure key={`${item.page}-${item.image}-${item.src}`}>
            <img
              alt={`Imagen del manual iCar-03, página ${item.page}`}
              loading="lazy"
              src={item.src}
            />
            <figcaption>
              Página {item.page} · Imagen {item.image}
            </figcaption>
          </figure>
        ))}
      </div>

      {visible < filtered.length && (
        <button
          className="load-more"
          onClick={() => setVisible((count) => count + 30)}
          type="button"
        >
          Mostrar más imágenes
        </button>
      )}
    </section>
  );
}
