export const metadata = {
  title: "Historia | Séptima Compañía de Bomberos Viña del Mar",
  description: "Historia de la Séptima Compañía de Bomberos de Viña del Mar, fundada el 21 de septiembre de 1971.",
}

const voluntariosFundadores = [
  "Carlos Jiménez Díaz",
  "Alfonso Navajas Irigoyen",
  "Hernán Lillo Nilo",
  "Herman Barentin Neumann",
  "Juan Broughton Carrasco",
  "Adolfo Gómez-Lobo Gatica",
  "Alfredo Luco Martinez",
  "Daniel Martínez Bonasco",
  "Klaus May Diener",
  "Anselmo Navarrete Rodriguez",
  "Hugo Tampier Bitner",
  "Hernán Vallejo Ladrón de Guevara",
  "Klauss Seeger Schweickadt",
  "Ernesto Vargas Sotomayor",
]

const oficialesFundadores = [
  { cargo: "Director", nombre: "Carlos Jiménez Díaz" },
  { cargo: "Capitán", nombre: "Alfonso Navajas Irigoyen" },
  { cargo: "Secretario", nombre: "Sergio Fuenzalida Almendroza" },
  { cargo: "Tesorero", nombre: "Marcos Fardella Díaz" },
  { cargo: "Teniente 1°", nombre: "Claudio Ortiz Rojas" },
  { cargo: "Teniente 2°", nombre: "Armando Ramírez Jiménez" },
  { cargo: "Teniente Forestal", nombre: "Ernesto Vargas Sotomayor" },
  { cargo: "Teniente Médico", nombre: "Hernán Lillo Nilo" },
  { cargo: "Ayudante", nombre: "Jaime Codina Díaz" },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _autoridadesPresentes = [
  "Sra. Olga Urtubia Lazo, Subdelegada del Gobierno",
  "Sres. Luis Sigall y Ariel Tachi, regidores de la Ilustre Municipalida de Viña del Mar",
  "Superintendente Sr. Juan Guillermo Brunet Barreiro",
  "Vicesuperintendente Sr. Oscar Martínez Vieira",
  "Secretario General Sr. José Novoa González",
  "Comandante Sr. Jaime Vergara Délano",
  "Segundo Comandante Sr. Sergio Molina Olmedo",
]

export default function Historia() {
  return (
    <div className="py-16">
      <div className="container">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-rojo-oscuro mb-4">
          Nuestra Historia
        </h1>
        <p className="text-xl text-gris-medio mb-12">Abnegación, Servicio y Disciplina</p>

        <div className="space-y-16">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-4">
                Los Orígenes (1968)
              </h2>
              <p className="text-gris-medio mb-4">
                El 22 de enero de 1968, un incendio gigante se inició con la quema de los boletos del Sporting. En fecha cercana, contiguo al barrio residencial Viña del Mar Alto, se quemaban los alrededores de la firma Rhona, y este incendio bajando hacia Viña del Mar, llegaba a las Siete Hermanas.
              </p>
              <p className="text-gris-medio">
                En febrero de 1968, un grupo de vecinos vio la necesidad de organizarse como brigada para combatir el fuego, esto en prevención al hecho que sus casas estaban rodeadas de bosques. La idea fue inmediatamente acogida por el presidente de la Junta de vecinos del sector, señor Carlos Jiménez D.
              </p>
            </div>
            <div className="bg-gris-claro rounded-lg p-8">
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-rojo-oscuro">21</div>
                <div className="font-heading text-2xl font-bold text-rojo-oscuro">Septiembre</div>
                <div className="font-heading text-3xl font-bold text-rojo-bombero">1971</div>
                <p className="text-sm text-gris-medio mt-2">Fecha de Fundación</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-4">
              La Brigada Forestal
            </h2>
            <p className="text-gris-medio mb-4">
              La Brigada Forestal de Viña del Mar Alto quedó formalmente constituida. Su primer Cuartel funcionó al costado del Club de Campo El Refugio, en el barrio Viña del Mar Alto, compuesto por un galpón metálico y un iglú de fibra de vidrio.
            </p>
            <p className="text-gris-medio mb-4">
              La Brigada consiga con el alcalde Juan Andueza Silva, la donación de un antiguo carro lavador de calles, marca Brockway 1940, que fue acondicionado para la extinción de incendios y en el transporte de personal y equipos.
            </p>
            <p className="text-gris-medio">
              Transcurrieron casi tres años de intensa actividad, recibieron instrucción y academias del Cuerpo de Bomberos y trabajaron apoyando en incendios forestales al Cuerpo de Bomberos y a CONAF.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-4">
              El Terremoto y la Fundación
            </h2>
            <p className="text-gris-medio mb-4">
              El 9 de julio de 1971, a raíz del terremoto que abarcó las provincias de Coquimbo, Santiago, Aconcagua y Valparaíso, la Brigada distribuyó <strong>un millón cuatrocientos mil litros de agua</strong> en Nueva Aurora, Villa Linda, Villa Londres, Las Colinas y Viña del Mar Alto.
            </p>
            <p className="text-gris-medio mb-6">
              El 21 de septiembre de 1971, por acuerdo del Directorio General del Cuerpo de Bomberos de Viña del Mar, la Brigada Forestal de Viña del Mar Alto pasó a ser Compañía regular del Cuerpo de Bomberos, bajo el número ordinal <strong>siete</strong> y con el nombre de <strong>Séptima Compañía de Bomberos, Bomba Viña del Mar Alto</strong>.
            </p>
            <div className="bg-rojo-oscuro text-white p-6 rounded-lg">
              <h3 className="font-heading text-xl font-bold mb-4 text-amarillo-seguridad">Acta de Fundación</h3>
              <p className="text-gray-200 italic">
                En Viña del Mar, a 21 de septiembre de 1971, a las 19:45 hrs, en el local Club de Campo El Refugio, se reunió en Sesión Solemne la Brigada Forestal de Viña del Mar Alto, con el fin de constituirse en Compañía regular del Cuerpo de Bomberos de Viña del Mar.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-6">
              Oficialidad Fundadora
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {oficialesFundadores.map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg">
                  <p className="text-sm text-gris-medio">{item.cargo}</p>
                  <p className="font-heading font-bold text-rojo-oscuro">{item.nombre}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-6">
              Voluntarios Fundadores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {voluntariosFundadores.map((nombre, index) => (
                <div key={index} className="bg-gris-claro p-3 rounded-lg text-center">
                  <p className="text-gris-carbon font-medium">{nombre}</p>
                </div>
              ))}
            </div>
            <p className="text-gris-medio mt-4 text-sm">
              Posterior al acuerdo del 6 de Septiembre de 1978, se completaron los registros con 49 voluntarios fundadores adicionales.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-4">
              Traslado del Cuartel
            </h2>
            <p className="text-gris-medio mb-4">
              En 1974 la Compañía se debió trasladar al Cuartel General, ya que un fuerte temporal había destruido su Cuartel. Fue acogida hasta diciembre de 1975, cuando se trasladó a su actual y definitiva ubicación en <strong>calle Logroño 1289</strong> en Viña del Mar Alto, gracias a la donación del terreno que les hizo el Club de Campo El Refugio.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-4">
              Línea de Tiempo
            </h2>
            <div className="space-y-6">
              {[
                { year: "1968", event: "Fundación de la Brigada Forestal de Viña del Mar Alto" },
                { year: "Julio 1971", event: "Distribución de 1.400.000 litros de agua tras terremoto" },
                { year: "21 sep 1971", event: "Fundación de la Séptima Compañía" },
                { year: "1974", event: "Traslado temporal al Cuartel General por temporal" },
                { year: "Dic 1975", event: "Traslado a calle Logroño 1289" },
                { year: "1980s", event: "Especialidad en incendios en altura" },
                { year: "25 nov 1995", event: "Canje con Vigésima Compañía Apoquindo" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className="w-32 flex-shrink-0 font-heading text-2xl font-bold text-rojo-bombero">
                    {item.year}
                  </div>
                  <div className="flex-1 h-px bg-rojo-bombero" />
                  <div className="flex-1 text-gris-medio">{item.event}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gris-claro p-8 rounded-lg">
            <h2 className="font-heading text-2xl font-bold text-rojo-oscuro mb-6">
              Actualidad
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-rojo-bombero">64</div>
                <div className="text-gris-medio">Bomberos</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-rojo-bombero">3</div>
                <div className="text-gris-medio">Bomberas</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-rojo-bombero">1971</div>
                <div className="text-gris-medio">Año de Fundación</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-rojo-bombero">2</div>
                <div className="text-gris-medio">Canjes activos</div>
              </div>
            </div>
            <p className="text-gris-medio">
              La Séptima Compañía desde su fundación se destacó en el combate de incendios forestales y, desde los años ochenta, en combate de incendios en altura. En la actualidad su especialidad es <strong>estructural y forestal</strong>. Su uniforme que inicialmente había sido de color granate, fue cambiado a color azul.
            </p>
            <p className="text-gris-medio mt-4 font-heading font-bold text-xl text-rojo-bombero">
              Lema: ABNEGACIÓN, SERVICIO Y DISCIPLINA
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
