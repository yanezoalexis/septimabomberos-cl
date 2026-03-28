"use client"

import Link from "next/link"
import { ArrowRight, Shield, Clock, AlertCircle, Truck, Hammer, Zap } from "lucide-react"
import { Hero } from "@/components/Hero"
import { GuardiaPanel, StatsSection } from "@/components/GuardiaPanel"
import { MaterialMayorCard, MantenimientoSection } from "@/components/MaterialMayorCard"
import { materialMayorUnits } from "@/lib/data"

const iconMap = { truck: Truck, hammer: Hammer, zap: Zap }

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      <section className="py-16 bg-gris-claro">
        <div className="container">
          <StatsSection />
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-rojo-bombero">
              <Shield className="w-10 h-10 text-rojo-bombero mb-4" />
              <h3 className="font-heading text-lg font-bold mb-2">Especialidad</h3>
              <p className="text-sm text-gris-medio">
                Estructural y Forestal con énfasis en rescate en altura
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-rojo-bombero">
              <Clock className="w-10 h-10 text-rojo-bombero mb-4" />
              <h3 className="font-heading text-lg font-bold mb-2">Guardia Nocturna</h3>
              <p className="text-sm text-gris-medio">
                Servicio continuo las 24 horas, todos los días del año
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-rojo-bombero">
              <AlertCircle className="w-10 h-10 text-rojo-bombero mb-4" />
              <h3 className="font-heading text-lg font-bold mb-2">Emergencias</h3>
              <p className="text-sm text-gris-medio">
                Respuesta inmediata al 132 - Bomberos
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-rojo-bombero">
              <GuardiaPanel />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-rojo-oscuro text-white">
        <div className="container">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4">
            Material Mayor
          </h2>
          <p className="text-center text-gray-200 mb-12 max-w-2xl mx-auto">
            Nuestras unidades especializadas equipadas para atender incendios estructurales, forestales y operaciones de rescate
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {materialMayorUnits.map((unit, index) => {
              const Icon = iconMap[unit.icon]
              return (
                <MaterialMayorCard
                  key={index}
                  code={unit.code}
                  name={unit.name}
                  type={unit.type}
                  details={unit.details}
                  icon={Icon}
                  featured={index === 0}
                />
              )
            })}
          </div>

          <MantenimientoSection />
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-rojo-oscuro mb-4">
                Nuestra Historia
              </h2>
              <p className="text-gris-medio mb-6">
                Desde nuestra fundación el <strong>21 de septiembre de 1971</strong>, la Séptima Compañía ha sido pilar fundamental del Cuerpo de Bomberos de Viña del Mar. Con más de 50 años de servicio ininterrumpido, continuamos con el lema que nos identifica: <span className="font-heading font-bold text-rojo-bombero">Abnegación, Servicio y Disciplina</span>.
              </p>
              <Link 
                href="/historia" 
                className="inline-flex items-center gap-2 text-rojo-bombero font-semibold hover:underline"
              >
                Conoce nuestra historia completa <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gris-claro rounded-lg p-8 text-center">
              <div className="font-heading text-6xl font-bold text-rojo-bombero mb-2">50+</div>
              <p className="text-lg font-semibold">Años de servicio</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-rojo-oscuro">1971</div>
                  <p className="text-sm text-gris-medio">Fundación</p>
                </div>
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-rojo-oscuro">1995</div>
                  <p className="text-sm text-gris-medio">Canje Apoquindo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-rojo-oscuro text-white">
        <div className="container text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            ¿Quieres ser voluntario?
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Únete a la Guardia Nocturna y forma parte de nuestra tradición de servicio y abnegación. Buscamos personas comprometidas con la comunidad.
          </p>
          <Link 
            href="/guardia-nocturna" 
            className="inline-flex items-center gap-2 bg-amarillo-seguridad text-gris-carbon px-8 py-4 font-bold rounded-md hover:bg-yellow-400 transition-colors text-lg"
          >
            Información para Voluntarios
          </Link>
        </div>
      </section>
    </div>
  )
}
