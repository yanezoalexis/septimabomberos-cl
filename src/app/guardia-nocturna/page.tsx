import { Clock, Users, Shield, ArrowRight, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Guardia Nocturna | Séptima Compañía de Bomberos Viña del Mar",
  description: "Información sobre la Guardia Nocturna de la Séptima Compañía. Únete a nuestro servicio de emergencias 24/7.",
}

export default function GuardiaNocturna() {
  return (
    <div className="py-16">
      <div className="container">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-rojo-oscuro mb-4">
          Guardia Nocturna
        </h1>
        <p className="text-xl text-gris-medio mb-12">Servicio continuo las 24 horas, todos los días del año</p>

        <section className="bg-gradient-to-br from-rojo-bombero to-rojo-oscuro text-white p-8 rounded-lg mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Clock className="w-12 h-12" />
            <h2 className="font-heading text-2xl font-bold">Servicio Permanente</h2>
          </div>
          <p className="text-lg text-gray-200">
            La Guardia Nocturna es el corazón operativo de nuestra Compañía. Un grupo de voluntarios permanece en Quartel las 24 horas del día, listo para responder a cualquier emergencia en Viña del Mar y sus alrededores.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="font-heading text-2xl font-bold text-rojo-oscuro mb-4">¿Qué es la Guardia?</h2>
            <p className="text-gris-medio mb-4">
              La Guardia Nocturna es un compromiso de servicio donde los voluntarios se turnan para permanecer en el cuartel durante la noche, garantizando una respuesta inmediata a las emergencias.
            </p>
            <ul className="space-y-3">
              {[
                "Respuesta inmediata a incendios",
                "Rescate en emergencias",
                "Atención de accidentes vehiculares",
                "Apoyo a otras compañías del cuerpo",
                "Capacitación continua",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-verde-exito flex-shrink-0" />
                  <span className="text-gris-medio">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gris-claro p-8 rounded-lg">
            <h3 className="font-heading text-xl font-bold text-rojo-oscuro mb-6">Horario de Guardia</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <span className="font-semibold">Lunes a Viernes</span>
                <span className="text-rojo-bombero font-bold">18:00 - 08:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <span className="font-semibold">Sábados</span>
                <span className="text-rojo-bombero font-bold">08:00 - 08:00 (24h)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Domingos y Festivos</span>
                <span className="text-rojo-bombero font-bold">08:00 - 08:00 (24h)</span>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-rojo-oscuro text-white p-8 rounded-lg mb-12">
          <h2 className="font-heading text-2xl font-bold mb-6 text-center">¿Cómo unirse a la Guardia?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Requisitos", desc: "Ser mayor de 18 años, contar con tiempo disponible y compromiso con la comunidad." },
              { step: "2", title: "Postulación", desc: "Contactanos a través del formulario o WhatsApp para iniciar el proceso." },
              { step: "3", title: "Capacitación", desc: "Recibirás formación básica en combate de incendios y primeros auxilios." },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-amarillo-seguridad text-rojo-oscuro rounded-full flex items-center justify-center font-heading font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold text-rojo-oscuro mb-6">Requisitos para Voluntarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-rojo-bombero" /> Requisitos Básicos
              </h3>
              <ul className="space-y-2 text-gris-medio">
                <li>• Ser mayor de 18 años</li>
                <li>• Tener disponibilidad mínima de 2 noches al mes</li>
                <li>• No tener antecedentes penales</li>
                <li>• Contar con buena condición física</li>
                <li>• Disposición para aprender</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h3 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-rojo-bombero" /> Lo que Proveemos
              </h3>
              <ul className="space-y-2 text-gris-medio">
                <li>• Uniforme completo de trabajo</li>
                <li>• Equipamiento de protección personal</li>
                <li>• Capacitación técnica gratuita</li>
                <li>• Certificaciones oficiales</li>
                <li>• Hermanos de armas y comunidad</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-12 text-center">
          <p className="text-lg text-gris-medio mb-4">¿Tienes preguntas sobre la Guardia?</p>
          <a 
            href="/contacto" 
            className="inline-flex items-center gap-2 bg-rojo-bombero text-white px-6 py-3 font-semibold rounded-md hover:bg-red-700 transition-colors"
          >
            Contáctanos <ArrowRight className="w-5 h-5" />
          </a>
        </section>
      </div>
    </div>
  )
}
