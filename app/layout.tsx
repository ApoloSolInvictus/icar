import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "iCar-03 | Guía, uso y venta",
  description:
    "Sitio comercial y práctico del iCar-03 con carga, seguridad, conectividad, mantenimiento, galería del manual y especificaciones técnicas.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "iCar-03 | Guía, uso y venta",
    description:
      "Una experiencia visual basada en el manual práctico del iCar-03.",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 901,
        alt: "iCar-03 guía, uso y venta",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iCar-03 | Guía, uso y venta",
    description:
      "Una experiencia visual basada en el manual práctico del iCar-03.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
