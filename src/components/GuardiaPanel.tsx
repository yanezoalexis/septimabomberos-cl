"use client"

import { useState, useEffect } from "react"
import { Clock, Users, Shield, CheckCircle, AlertTriangle, UserPlus, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface GuardiaData {
  estado: "activa" | "inactiva" | "ejercicio"
  voluntariosActivos: number
  proximoTurno?: string
  proximoEjercicio?: string
}

const defaultData: GuardiaData = {
  estado: "activa",
  voluntariosActivos: 8,
  proximoTurno: "Lunes 18:00",
  proximoEjercicio: "Sábado 09:00",
}

interface GuardiaPanelProps {
  data?: GuardiaData
}

export function GuardiaPanel({ data = defaultData }: GuardiaPanelProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const getEstadoInfo = (estado: GuardiaData["estado"]) => {
    switch (estado) {
      case "activa":
        return {
          label: "GUARDIA ACTIVA",
          color: "bg-verde-exito",
          textColor: "text-verde-exito",
          icon: CheckCircle,
          bg: "bg-green-50",
          border: "border-green-200",
          description: "Dotación completa en servicio",
        }
      case "inactiva":
        return {
          label: "GUARDIA INACTIVA",
          color: "bg-gris-medio",
          textColor: "text-gris-medio",
          icon: AlertTriangle,
          bg: "bg-gray-50",
          border: "border-gray-200",
          description: "Fuera de horario de servicio",
        }
      case "ejercicio":
        return {
          label: "EN EJERCICIO",
          color: "bg-amarillo-seguridad",
          textColor: "text-amarillo-seguridad",
          icon: AlertTriangle,
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          description: "Personal en capacitación",
        }
    }
  }

  const estadoInfo = getEstadoInfo(data.estado)
  const EstadoIcon = estadoInfo.icon

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className={cn("p-6", estadoInfo.bg, "border-b", estadoInfo.border)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn("w-3 h-3 rounded-full", estadoInfo.color)} />
            <span className={cn("font-heading text-sm font-bold tracking-wider", estadoInfo.textColor)}>
              {estadoInfo.label}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gris-medio">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-mono">
              {currentTime.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <EstadoIcon className={cn("w-5 h-5", estadoInfo.textColor)} />
          <span className="text-sm text-gris-medio">{estadoInfo.description}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gris-claro rounded-lg">
            <Users className="w-6 h-6 text-rojo-bombero mx-auto mb-2" />
            <div className="font-heading text-3xl font-bold text-rojo-oscuro">
              {data.voluntariosActivos}
            </div>
            <div className="text-xs text-gris-medio">Voluntarios en servicio</div>
          </div>
          <div className="text-center p-4 bg-gris-claro rounded-lg">
            <Shield className="w-6 h-6 text-rojo-bombero mx-auto mb-2" />
            <div className="font-heading text-3xl font-bold text-rojo-oscuro">
              24/7
            </div>
            <div className="text-xs text-gris-medio">Horas de servicio</div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gris-medio">Próximo turno:</span>
            <span className="font-semibold text-rojo-oscuro">{data.proximoTurno}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gris-medio">Próximo ejercicio:</span>
            <span className="font-semibold text-rojo-oscuro">{data.proximoEjercicio}</span>
          </div>
        </div>

        <a
          href="/guardia-nocturna"
          className="flex items-center justify-center gap-2 w-full py-3 bg-rojo-bombero text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          Infórmate sobre la Guardia
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

export function StatsSection() {
  const stats = [
    { label: "Años de servicio", value: "50+" },
    { label: "Voluntarios activos", value: "67" },
    { label: "Emergencias anuales", value: "500+" },
    { label: "Unidades en servicio", value: "3" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md border-t-4 border-rojo-bombero text-center">
          <div className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero">
            {stat.value}
          </div>
          <div className="text-xs text-gris-medio">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
