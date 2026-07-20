# iCar-03

Sitio comercial y práctico del iCar-03, construido con Next.js para desplegar en
Vercel. El contenido está basado en el manual `Manual iCar-03 25 Agosto 2024.pdf`
e incluye guía de carga, uso diario, argumento de venta, especificaciones y una
galería visual del manual.

## Requisitos

- Node.js `>=22.13.0`
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Build de producción

```bash
npm run build
npm run start
```

## Despliegue en Vercel

Este repo ya está preparado para Vercel como una app Next.js estándar.

1. Importa `ApoloSolInvictus/icar` en Vercel.
2. Usa estos valores:
   - Framework Preset: `Next.js`
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: vacío, Vercel lo detecta automáticamente
3. No se requieren variables de entorno para la versión actual.

También puedes desplegar desde CLI:

```bash
npm i -g vercel
vercel
vercel --prod
```

## Estructura principal

- `app/page.tsx`: página principal del iCar-03
- `app/Gallery.tsx`: galería filtrable con carga progresiva
- `app/globals.css`: diseño visual estilo mapa y responsive
- `public/assets/`: imágenes extraídas y optimizadas del manual
- `public/og.png`: imagen social para enlaces compartidos

## Notas

El sitio ya no depende de GitHub Pages, Cloudflare Workers, Vinext, D1 ni R2. Las
funciones necesarias para la experiencia actual se resuelven con Next.js y assets
estáticos servidos por Vercel.
