import { Shield, Award, Users } from "lucide-react"

export const metadata = {
  title: "Rescate en Desnivel | Séptima Compañía de Bomberos Viña del Mar",
  description: "Especialidad de la Séptima Compañía en Rescate en Desnivel y Rescate Vehicular de alta complejidad.",
}

export default function RescateDesnivel() {
  return (
    <div className="py-16">
      <div className="container">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-rojo-oscuro mb-4">
          Rescate en Desnivel
        </h1>
        <p className="text-xl text-gris-medio mb-12">Nuestra especialidad principal</p>

        <section className="bg-gradient-to-br from-rojo-oscuro to-rojo-bombero text-white p-8 rounded-lg mb-12">
          <h2 className="font-heading text-2xl font-bold mb-4">¿Qué es el Rescate en Desnivel?</h2>
          <p className="text-lg text-gray-200">
            El rescate en desnivel es una técnica especializada que permite la atención de emergencias en zonas de difícil acceso: precipicios, torres, edificaciones en construcción,深的山谷 y accidentes vehiculares en pendientes. Requiere equipamiento especializado y personal altamente capacitado.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border-2 border-rojo-bombero p-6 rounded-lg">
            <Shield className="w-12 h-12 text-rojo-bombero mb-4" />
            <h3 className="font-heading text-xl font-bold mb-2">Técnicas Especializadas</h3>
            <p className="text-gris-medio text-sm">
              Uso de sistemas de cuerdas, arneses y dispositivos de descenso controlado para operaciones en altura.
            </p>
          </div>
          <div className="bg-white border-2 border-rojo-bombero p-6 rounded-lg">
            <Award className="w-12 h-12 text-rojo-bombero mb-4" />
            <h3 className="font-heading text-xl font-bold mb-2">Certificaciones</h3>
            <p className="text-gris-medio text-sm">
              Instructores formados en la Academia Nacional de Bomberos, con capacitación internacional.
            </p>
          </div>
          <div className="bg-white border-2 border-rojo-bombero p-6 rounded-lg">
            <Users className="w-12 h-12 text-rojo-bombero mb-4" />
            <h3 className="font-heading text-xl font-bold mb-2">Equipo Especializado</h3>
            <p className="text-gris-medio text-sm">
              Voluntarios capacitados en técnicas de primeros auxilios, rescate vehicular y atención prehospitalaria.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="font-heading text-3xl font-bold text-rojo-oscuro mb-6">Tipos de Rescate</h2>
          <div className="space-y-4">
            {[
              { title: "Rescate Vehicular", desc: "Accidentes de tráfico, vehículos atrapados, extricación de víctimas." },
              { title: "Rescate en Altura", desc: "Edificios, torres, estructuras elevadas, personas atrapadas en altura." },
              { title: "Rescate en Desnivel", desc: "Valles, precipicios, accidentes en pendientes y zonas de difícil acceso." },
              { title: "Rescate Industrial", desc: "Accidentes en faenas mineras, industriales y de construcción." },
            ].map((item, index) => (
              <div key={index} className="bg-gris-claro p-6 rounded-lg">
                <h3 className="font-heading text-xl font-bold text-rojo-bombero mb-2">{item.title}</h3>
                <p className="text-gris-medio">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-3xl font-bold text-rojo-oscuro mb-6">Equipamiento Especializado</h2>
          <div className="bg-rojo-oscuro text-white p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading text-xl font-bold mb-4 text-amarillo-seguridad">Equipos de Rescate</h3>
                <ul className="space-y-2 text-gray-200">
                  <li>• Sistemas de cuerdas (rope rescue)</li>
                  <li>• Arneses全身</li>
                  <li>• Descensores y ascensores</li>
                  <li>• Polipastos y trócolas</li>
                  <li>• Camillas baskets y tablas espinales</li>
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold mb-4 text-amarillo-seguridad">Herramientas de Extricación</h3>
                <ul className="space-y-2 text-gray-200">
                  <li>• Tijeras hidráulicas</li>
                  <li>• Separadores hidráulicos</li>
                  <li>• Cilindros de rescate</li>
                  <li>• Sistemas de bloqueo y estabilización</li>
                  <li>• Equipos de protección contra corte</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
