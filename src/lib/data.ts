import { Truck, Hammer, Zap } from "lucide-react"

export interface MaterialMayorUnit {
  code: string
  name: string
  type: string
  details: string[]
  icon: "truck" | "hammer" | "zap"
}

export const materialMayorUnits: MaterialMayorUnit[] = [
  {
    code: "Máquina 71",
    name: "Unidad de Rescate en Desnivel",
    type: "Clase Urban Interfaz 4x4",
    details: [
      "Marca: HME Arhens Fox sobre chassis International 7400",
      "Motor: MaxxForce 9300cc",
      "Bomba: Darley JMP (alta y baja presión) 500 GPM",
      "Estanque: 500 galones agua + Espuma",
      "Equipamiento: Escalas correderas, intercomunicadores, radio digital",
      "Capacidad: Doble cabina",
    ],
    icon: "truck",
  },
  {
    code: "Máquina 72",
    name: "Unidad de Specialty Estructural",
    type: "Primera intervención",
    details: [
      "Marca: Renault - Camiva",
      "Modelo: FPT Midlum 220.13",
      "Año: [PENDIENTE]",
      "Equipamiento: Equipos de aire comprimido, escalas",
      "Material menor de rescate",
    ],
    icon: "hammer",
  },
  {
    code: "Máquina 73",
    name: "Unidad Aljibe",
    type: "Apoyo incendios",
    details: [
      "Chasis: Freightliner M2106",
      "Capacidad estanque: 8.000 litros",
      "Bomba: 500 galones por minuto",
      "Capacidad tripulación: 3 bomberos",
      "Descarga rápida",
    ],
    icon: "zap",
  },
]

export function getIconFromString(iconName: "truck" | "hammer" | "zap") {
  const icons = { truck: Truck, hammer: Hammer, zap: Zap }
  return icons[iconName] || Truck
}
