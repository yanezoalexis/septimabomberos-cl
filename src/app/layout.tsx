import type { Metadata, Viewport } from "next"
import { Oswald, Source_Sans_3, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Navigation, EmergencyBanner } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Analytics } from "@vercel/analytics/react"

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://septimabomberos-cl.vercel.app"),
  title: {
    default: "Séptima Compañía de Bomberos de Viña del Mar | Rescate en Desnivel",
    template: "%s | Séptima Compañía de Bomberos Viña del Mar",
  },
  description: "Séptima Compañía de Bomberos de Viña del Mar. Especialidad en Rescate en Desnivel. Guardia Nocturna activa. Honor, Servicio y Disciplina.",
  keywords: ["bomberos", "Viña del Mar", "rescate en desnivel", "séptima compañía", "guardia nocturna", "emergencia", "Chile"],
  authors: [{ name: "Séptima Compañía de Bomberos de Viña del Mar" }],
  creator: "Séptima Compañía de Bomberos de Viña del Mar",
  publisher: "Cuerpo de Bomberos de Viña del Mar",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Séptima Compañía de Bomberos de Viña del Mar",
    description: "Especialidad en Rescate en Desnivel. Guardia Nocturna activa. Más de 50 años protegiendo Viña del Mar.",
    type: "website",
    locale: "es_CL",
    siteName: "Séptima Compañía CBVM",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Séptima Compañía de Bomberos de Viña del Mar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Séptima Compañía de Bomberos de Viña del Mar",
    description: "Especialidad en Rescate en Desnivel. Guardia Nocturna activa.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#C41E3A" },
    { media: "(prefers-color-scheme: dark)", color: "#DC143C" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${oswald.variable} ${sourceSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-blanco text-gris-carbon">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-rojo-bombero focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-amarillo-seguridad"
        >
          Saltar al contenido principal
        </a>
        <EmergencyBanner />
        <Navigation />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
