import { Phone, Mail, MapPin } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"

export const metadata = {
  title: "Contacto | Séptima Compañía de Bomberos Viña del Mar",
  description: "Contacta a la Séptima Compañía de Bomberos de Viña del Mar.",
}

export default function Contacto() {
  return (
    <div className="py-16">
      <div className="container">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-rojo-oscuro mb-4">
          Contacto
        </h1>
        <p className="text-xl text-gris-medio mb-12">Escríbenos o visítanos</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gris-claro p-8 rounded-lg mb-8">
              <h2 className="font-heading text-2xl font-bold text-rojo-oscuro mb-6">
                Información de Contacto
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rojo-bombero text-white rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Teléfono</p>
                    <p className="text-gris-medio">(56-32) 261 03 97</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rojo-bombero text-white rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gris-medio">contacto@septimabomberos.cl</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rojo-bombero text-white rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Dirección</p>
                    <p className="text-gris-medio">Viña del Mar, Chile</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-rojo-oscuro text-white p-8 rounded-lg">
              <h2 className="font-heading text-2xl font-bold mb-4">Emergencias</h2>
              <p className="text-gray-200 mb-4">
                Para emergencias, contacta directamente a Bomberos al:
              </p>
              <p className="font-heading text-4xl font-bold text-amarillo-seguridad">132</p>
              <p className="text-gray-200 mt-2">Línea gratuita las 24 horas</p>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 p-8 rounded-lg">
            <h2 className="font-heading text-2xl font-bold text-rojo-oscuro mb-6">
              Formulario de Contacto
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
