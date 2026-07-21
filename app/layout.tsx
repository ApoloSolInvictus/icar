import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Centro iCar IA | Soporte para ICAR 03, V23 y V27",
  description:
    "Asistente OpenAI para soporte, mantenimiento, carga, repuestos, accesorios y mejoras de la familia ICAR.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Centro iCar IA",
    description:
      "Chat tecnico con texto, microfono y voz para propietarios ICAR.",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 901,
        alt: "Centro iCar IA",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Centro iCar IA",
    description:
      "Soporte, mantenimiento, partes y extras para ICAR con chatbot OpenAI.",
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
