import { Truck, Hammer, Zap, Droplets, CircleDot, Star } from "lucide-react"

export const metadata = {
  title: "Material Mayor | Séptima Compañía de Bomberos Viña del Mar",
  description: "Conoce nuestras unidades de Material Mayor: M-71, M-72, M-73 y UR-3. Flota operativa especializada para incendios, rescate y emergencias.",
}

const units = [
  {
    code: "M-71",
    name: "Unidad de Rescate en Desnivel",
    type: "Urban Interface 4x4",
    details: [
      "Chasis: HME Arhens Fox sobre International 7400",
      "Motor: MaxxForce 9300cc - 330 HP",
      "Bomba: Darley JMP (alta y baja presión) 500 GPM",
      "Estanque: 500 galones agua + Espuma",
      "Equipamiento: Escalas correderas, intercomunicadores, radio digital",
      "Capacidad: Doble cabina",
      "Año: 2015",
    ],
    icon: Truck,
  },
  {
    code: "M-72",
    name: "Unidad de Primera Intervención",
    type: "Spartan MetroStar",
    details: [
      "Chasis: Spartan MetroStar",
      "Carrocería: Cuerpo de bomberos",
      "Equipamiento: Equipos de aire comprimido, escalas, material menor de rescate",
      "Año: 2024",
      "Estado: En operación",
    ],
    icon: Star,
    isNew: true,
  },
  {
    code: "M-73",
    name: "Unidad Aljibe",
    type: "Apoyo incendios",
    details: [
      "Chasis: Freightliner M2106",
      "Motor: 300 HP",
      "Capacidad estanque: 8.000 litros (2.100 galones)",
      "Bomba: Darley 500 GPM",
      "Capacidad tripulación: 3 bomberos",
      "Año: 2014",
    ],
    icon: Zap,
  },
  {
    code: "UR-3",
    name: "Unidad de Rescate Urbano",
    type: "Rescate",
    details: [
      "Tipo: Unidad de rescate",
      "Equipamiento: Herramientas de rescate, equipos de comunicación",
      "Capacidad: Equipo completo de rescate",
      "Patrulla de emergencia",
    ],
    icon: Hammer,
  },
]

export default function MaterialMayor() {
  return (
    <div className="py-16">
      <div className="container">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-rojo-oscuro mb-4">
          Material Mayor
        </h1>
        <p className="text-xl text-gris-medio mb-12">Nuestras unidades especializadas</p>

        <section className="bg-gradient-to-br from-rojo-oscuro to-rojo-bombero text-white p-8 rounded-lg mb-12">
          <h2 className="font-heading text-2xl font-bold mb-4">Flota Operativa</h2>
          <p className="text-lg text-gray-200">
            La Séptima Compañía cuenta con un moderno parque de vehículos especializados, equipados para atender incendios estructurales, forestales y operaciones de rescate en desnivel. Nuestra flota incluye unidades de última generación, incluyendo la nueva M-72 Spartan MetroStar (2024), dotadas de tecnología de vanguardia para garantizar una respuesta efectiva en emergencias.
          </p>
        </section>

        <div className="space-y-8">
          {units.map((unit, index) => (
            <div key={index} className="bg-white border-2 border-rojo-bombero rounded-lg overflow-hidden">
              <div className="bg-rojo-oscuro text-white p-6 flex items-center gap-4 flex-wrap relative">
                <div className="w-16 h-16 bg-rojo-bombero rounded-lg flex items-center justify-center">
                  <unit.icon className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-heading text-3xl font-bold">{unit.code}</div>
                  <div className="text-gray-200">{unit.name}</div>
                </div>
                <span className="ml-auto bg-amarillo-seguridad text-rojo-oscuro px-4 py-1 rounded-full font-bold text-sm">
                  {unit.type}
                </span>
                {unit.isNew && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full font-bold text-xs animate-pulse">
                    NUEVA
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-rojo-oscuro mb-4">Características Técnicas</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {unit.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CircleDot className="w-4 h-4 text-rojo-bombero flex-shrink-0" />
                      <span className="text-gris-medio">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12 bg-gris-claro p-8 rounded-lg">
          <h2 className="font-heading text-2xl font-bold text-rojo-oscuro mb-6">
            Mantenimiento y Preparación
          </h2>
          <p className="text-gris-medio mb-4">
            Todas nuestras unidades undergo mantenimiento preventivo y correctivo regular para garantizar su disponibilidad operativa las 24 horas del día.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <Droplets className="w-8 h-8 text-rojo-bombero mx-auto mb-2" />
              <p className="font-semibold">Revisión hidráulica</p>
              <p className="text-sm text-gris-medio">Mensual</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <Hammer className="w-8 h-8 text-rojo-bombero mx-auto mb-2" />
              <p className="font-semibold">Mantenimiento general</p>
              <p className="text-sm text-gris-medio">Trimestral</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <Truck className="w-8 h-8 text-rojo-bombero mx-auto mb-2" />
              <p className="font-semibold">Inspección operativa</p>
              <p className="text-sm text-gris-medio">Diaria</p>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-rojo-oscuro text-white p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <CircleDot className="w-6 h-6 text-amarillo-seguridad" />
            <h2 className="font-heading text-2xl font-bold">Canje Activo</h2>
          </div>
          <p className="text-gray-200">
            La Séptima Compañía mantiene canje con la <strong>Vigésima Compañía del Cuerpo de Bomberos de Santiago, Bomba Apoquindo</strong>, desde el 25 de noviembre de 1995.
          </p>
        </section>
      </div>
    </div>
  )
}
