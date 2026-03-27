import type { Metadata } from "next";
import "./globals.css";
import { Navigation, EmergencyBanner } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Séptima Compañía de Bomberos de Viña del Mar | Rescate en Desnivel",
  description: "Séptima Compañía de Bomberos de Viña del Mar. Especialidad en Rescate en Desnivel. Guardia Nocturna activa. Honor, Servicio y Disciplina.",
  keywords: ["bomberos", "Viña del Mar", "rescate en desnivel", "séptima compañía", "guardia nocturna", "emergencia", "Chile"],
  authors: [{ name: "Séptima Compañía de Bomberos de Viña del Mar" }],
  openGraph: {
    title: "Séptima Compañía de Bomberos de Viña del Mar",
    description: "Especialidad en Rescate en Desnivel. Guardia Nocturna activa.",
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col bg-blanco text-gris-carbon">
        <EmergencyBanner />
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
