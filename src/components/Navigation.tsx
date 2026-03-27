"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/historia", label: "Historia" },
  { href: "/rescate-desnivel", label: "Rescate en Desnivel" },
  { href: "/guardia-nocturna", label: "Guardia Nocturna" },
  { href: "/material-mayor", label: "Material Mayor" },
  { href: "/noticias", label: "Noticias" },
  { href: "/contacto", label: "Contacto" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-rojo-oscuro text-white shadow-lg">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-rojo-bombero rounded flex items-center justify-center font-heading font-bold text-lg">
              7
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading text-sm sm:text-lg font-bold leading-tight">
                Séptima Compañía
              </h1>
              <p className="text-xs text-gray-300">Bomberos Viña del Mar</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-rojo-bombero",
                  pathname === item.href
                    ? "bg-rojo-bombero text-white"
                    : "text-gray-100"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 hover:bg-rojo-bombero rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-rojo-oscuro border-t border-gray-700">
          <div className="container py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-3 text-base font-medium rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-rojo-bombero text-white"
                    : "hover:bg-gray-700"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export function EmergencyBanner() {
  return (
    <div className="bg-amarillo-seguridad text-gris-carbon py-2 px-4">
      <div className="container flex items-center justify-center gap-2 text-sm font-semibold">
        <AlertTriangle className="w-4 h-4" />
        <span>Emergency: En caso de emergencia, llame al 132 (Bomberos)</span>
      </div>
    </div>
  )
}
