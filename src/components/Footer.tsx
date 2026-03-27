import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gris-carbon text-white dark:bg-black">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-xl font-bold mb-4 text-rojo-bombero">
              Séptima Compañía
            </h3>
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              Cuerpo de Bomberos de Viña del Mar
            </p>
            <p className="text-gray-300 dark:text-gray-400 text-sm mt-2">
              Especialidad: Estructural y Forestal
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold mb-4 text-white">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-rojo-bombero flex-shrink-0" />
                <span className="text-gray-300 dark:text-gray-400">(56-32) 261 03 97</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-rojo-bombero flex-shrink-0" />
                <span className="text-gray-300 dark:text-gray-400">contacto@septimabomberos.cl</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-rojo-bombero flex-shrink-0" />
                <span className="text-gray-300 dark:text-gray-400">Logroño 1298, Viña del Mar Alto</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold mb-4 text-white">Enlaces</h3>
            <div className="space-y-2 text-sm">
              <Link href="/contacto" className="block text-gray-300 dark:text-gray-400 hover:text-rojo-bombero transition-colors">
                Formulario de contacto
              </Link>
              <Link href="/guardia-nocturna" className="block text-gray-300 dark:text-gray-400 hover:text-rojo-bombero transition-colors">
                Únete a la Guardia
              </Link>
              <a 
                href="https://www.bomberosvinadelmar.cl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-gray-300 dark:text-gray-400 hover:text-rojo-bombero transition-colors"
              >
                Cuerpo de Bomberos VM
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Séptima Compañía de Bomberos de Viña del Mar. Todos los derechos reservados.</p>
          <p className="mt-2">Abnegación, Servicio y Disciplina</p>
        </div>
      </div>
    </footer>
  )
}
