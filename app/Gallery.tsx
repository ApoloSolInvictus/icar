"use client";

import { useEffect, useMemo, useState } from "react";

type GalleryImage = {
  src: string;
  kind: "web" | "manual";
  title: string;
  credit: string;
  href: string;
  page?: number;
  image?: number;
};

type GalleryFilter = {
  label: string;
  kind: "all" | "web" | "manual";
  from?: number;
  to?: number;
};

const filters: GalleryFilter[] = [
  { label: "Todo", kind: "all" },
  { label: "Fotos reales", kind: "web" },
  { label: "Manual limpio", kind: "manual" },
  { label: "Carga", kind: "manual", from: 1, to: 39 },
  { label: "Pantalla", kind: "manual", from: 69, to: 100 },
  { label: "Seguridad", kind: "manual", from: 244, to: 272 },
  { label: "Especificación", kind: "manual", from: 374, to: 386 },
];

export function Gallery() {
  const [items, setItems] = useState<GalleryImage[]>([]);
  const [active, setActive] = useState(filters[0]);
  const [visible, setVisible] = useState(30);

  useEffect(() => {
    fetch("/assets/gallery-manifest.json")
      .then((response) => response.json())
      .then((data: GalleryImage[]) => setItems(data))
      .catch(() => setItems([]));
  }, []);

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        if (active.kind !== "all" && item.kind !== active.kind) return false;
        if (active.from && active.to) {
          return (
            typeof item.page === "number" &&
            item.page >= active.from &&
            item.page <= active.to
          );
        }
        return true;
      }),
    [active, items],
  );

  const shown = filtered.slice(0, visible);

  return (
    <section className="gallery-section" id="galeria">
      <div className="section-kicker">Galería curada</div>
      <div className="section-heading">
        <h2>Fotos reales del iCar y manual limpio, sin imágenes vacías.</h2>
        <p>
          La galería ahora combina fotos web reales con una selección filtrada
          del manual. Se retiraron máscaras, recortes negros y artefactos que
          venían de la extracción del PDF.
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
          <figure key={item.src}>
            <img alt={item.title} loading="lazy" src={item.src} />
            <figcaption>
              <strong>{item.title}</strong>
              <a href={item.href} rel="noreferrer" target="_blank">
                {item.credit}
              </a>
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
