"use client"

import { cn } from "@/lib/utils"
import { LucideIcon, CircleDot, Truck, Hammer, Droplets } from "lucide-react"

interface MaterialMayorCardProps {
  code: string
  name: string
  type: string
  details: string[]
  icon?: LucideIcon
  featured?: boolean
}

export function MaterialMayorCard({ code, name, type, details, icon: Icon = Truck, featured = false }: MaterialMayorCardProps) {
  return (
    <article
      className={cn(
        "bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl",
        featured ? "border-2 border-rojo-bombero" : "border border-gray-200"
      )}
    >
      <div className={cn(
        "p-6 flex items-center gap-4",
        featured ? "bg-gradient-to-r from-rojo-oscuro to-rojo-bombero text-white" : "bg-rojo-oscuro text-white"
      )}>
        <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-heading text-2xl md:text-3xl font-bold">{code}</div>
          <div className="text-gray-200 text-sm truncate">{name}</div>
        </div>
        {featured && (
          <span className="bg-amarillo-seguridad text-rojo-oscuro px-3 py-1 rounded-full font-bold text-xs flex-shrink-0">
            INSIGNIA
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="mb-4">
          <span className="inline-block bg-gris-claro text-gris-medio px-3 py-1 rounded-full text-xs font-medium">
            {type}
          </span>
        </div>

        <h3 className="font-heading text-base font-bold text-rojo-oscuro mb-3">
          Especificaciones Técnicas
        </h3>
        
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start gap-2">
              <CircleDot className="w-3 h-3 text-rojo-bombero flex-shrink-0 mt-1.5" />
              <span className="text-sm text-gris-medio">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

interface MaterialMayorGridProps {
  units: MaterialMayorCardProps[]
}

export function MaterialMayorGrid({ units }: MaterialMayorGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {units.map((unit, index) => (
        <MaterialMayorCard key={index} {...unit} featured={index === 0} />
      ))}
    </div>
  )
}

export function MantenimientoSection() {
  return (
    <section className="bg-gris-claro p-6 md:p-8 rounded-lg">
      <h2 className="font-heading text-xl font-bold text-rojo-oscuro mb-6">
        Protocolo de Mantenimiento
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg text-center">
          <Droplets className="w-8 h-8 text-rojo-bombero mx-auto mb-2" />
          <p className="font-semibold text-sm">Revisión hidráulica</p>
          <p className="text-xs text-gris-medio">Mensual</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center">
          <Hammer className="w-8 h-8 text-rojo-bombero mx-auto mb-2" />
          <p className="font-semibold text-sm">Mantenimiento general</p>
          <p className="text-xs text-gris-medio">Trimestral</p>
        </div>
        <div className="bg-white p-4 rounded-lg text-center">
          <Truck className="w-8 h-8 text-rojo-bombero mx-auto mb-2" />
          <p className="font-semibold text-sm">Inspección operativa</p>
          <p className="text-xs text-gris-medio">Diaria</p>
        </div>
      </div>
    </section>
  )
}
