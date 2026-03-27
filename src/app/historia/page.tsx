export const metadata = {
  title: "Historia | Séptima Compañía de Bomberos Viña del Mar",
  description: "Historia de la Séptima Compañía de Bomberos de Viña del Mar, fundada el 21 de septiembre de 1971.",
}

const voluntariosFundadores = [
  "Alfonso Navajas Irigoyen",
  "Sergio Almonacid",
  "Eduardo Aparicio",
  "Jorge Araya",
  "Herman Barentin Neumann",
  "Carlos Broughton",
  "Juan Broughton Carrasco",
  "Benito Cabezón",
  "Bruno Caruso",
  "Álvaro Calvo",
  "Enrique Codina",
  "Jaime Codina Díaz",
  "Jorge Codina",
  "Alejandro Crichton",
  "Jorge Cuevas",
  "Claudio Di Domeico",
  "Luis Fabri",
  "Marcos Fardella Díaz",
  "Sergio Fuenzalida Almendroza",
  "Adolfo Gómez-Lobo Gatica",
  "Carlos Jiménez Díaz",
  "Cristian Koch",
  "Hernán Lillo Nilo",
  "Alfredo Luco Martinez",
  "Daniel Martínez Bonasco",
  "Klaus May Diener",
  "Axel Merwald",
  "Enrique Moyano",
  "Leonardo Muñoz",
  "Sergio Muñoz",
  "Anselmo Navarrete Rodriguez",
  "Claudio Ortiz Rojas",
  "Felipe Ortiz",
  "Rodrigo Ortiz",
  "Pedro Pizarro",
  "Armando Ramírez Jiménez",
  "Pedro Ramis",
  "Ramón Rojas Buist",
  "Edgardo Schaufler",
  "Klaus Seeger Schweickadt",
  "Hugo Tampier Bitner",
  "Cristian Vallejo",
  "Hernán Vallejo Ladrón de Guevara",
  "Ernesto Vargas Sotomayor",
  "Pablo Zavala",
  "Carlos Zoppi",
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

const autoridadesPresentes = [
  "Sra. Olga Urtubia Lazo, Subdelegada del Gobierno",
  "Sres. Luis Sigall y Ariel Tachi, regidores de la Ilustre Municipalidad de Viña del Mar",
  "Superintendente Sr. Juan Guillermo Brunet Barreiro",
  "Vicesuperintendente Sr. Oscar Martínez Vieira",
  "Secretario General Sr. José Novoa González",
  "Comandante Sr. Jaime Vergara Délano",
  "Segundo Comandante Sr. Sergio Molina Olmedo",
]

const directoresCompania = [
  "Primera, Sr. Gustavo Paulsen Espejo",
  "Segunda, Sr. Héctor Espinoza Robles",
  "Tercera, Sr. Alfonso Hernández Canto",
  "Cuarta, Sr. Julio Rubio Gómez",
  "Quinta, Sr. Luis Toro González",
  "Sexta, Sr. Francisco Ortiz Navarro",
]

const miembrosHonorarios = [
  "José Rafael Brunet",
  "Javier Murgues",
  "Pedro Dazarola",
  "Manuel Cisternas",
]

export default function Historia() {
  return (
    <div className="py-16">
      <div className="container">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-rojo-oscuro mb-4">
          Nuestra Historia
        </h1>
        <p className="text-xl text-gris-medio mb-12">Abnegación, Servicio y Disciplina</p>

        <div className="space-y-20">
          {/* Sección Hero */}
          <section className="text-center py-12 bg-gradient-to-r from-rojo-bombero to-rojo-oscuro rounded-2xl text-white">
            <div className="max-w-4xl mx-auto px-6">
              <div className="mb-8">
                <div className="inline-block w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="font-heading text-5xl font-bold">7</span>
                </div>
                <p className="font-heading text-amarillo-seguridad text-lg tracking-widest mb-2">
                  CUERPO DE BOMBEROS DE VIÑA DEL MAR
                </p>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Séptima Compañía de Bomberos
              </h2>
              <p className="text-xl mb-6">
                Bomba Viña del Mar Alto
              </p>
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg px-8 py-4">
                <p className="text-sm mb-1">Fundada el</p>
                <p className="font-heading text-4xl font-bold">21 DE SEPTIEMBRE DE 1971</p>
              </div>
            </div>
          </section>

          {/* Los Orígenes */}
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-6 border-l-4 border-rojo-bombero pl-4">
              Los Orígenes (1968)
            </h2>
            <div className="bg-gris-claro rounded-lg p-8 space-y-4">
              <p className="text-gris-medio">
                El <strong>22 de enero de 1968</strong>, un incendio gigante se iniciaba con la quema de los boletos del Sporting. En fecha cercana, contiguo al barrio residencial Viña del Mar Alto, se quemaban los alrededores de la firma Rhona, y este incendio bajando hacia Viña del Mar, llegaba a las Siete Hermanas.
              </p>
              <p className="text-gris-medio">
                En el mes de <strong>febrero de 1968</strong>, un grupo de vecinos vio la necesidad de organizarse como brigada para combatir el fuego, esto en prevención al hecho que sus casas estaban rodeadas de bosques. La idea fue inmediatamente acogida por el presidente de la Junta de vecinos del sector señor <strong>Carlos Jiménez D.</strong> quien cooperó para que este grupo se consolidara como <strong>Brigada Forestal de Viña del Mar Alto</strong>.
              </p>
            </div>
          </section>

          {/* Primer Cuartel */}
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-6 border-l-4 border-rojo-bombero pl-4">
              Primer Cuartel
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-gris-medio">
                <p>
                  Su primer Cuartel funcionó al costado del <strong>Club de Campo El Refugio</strong>, en el barrio Viña del Mar Alto, el que estaba compuesto por un <strong>galpón metálico</strong> y un <strong>iglú de fibra de vidrio</strong>.
                </p>
                <p>
                  La Brigada consiguió con el alcalde <strong>Juan Andueza Silva</strong>, la donación de un antiguo carro lavador de calles, marca <strong>Brockway 1940</strong>, que fue acondicionado para la extinción de incendios y en el transporte de personal y equipos.
                </p>
              </div>
              <div className="bg-rojo-oscuro text-white rounded-lg p-6 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-heading text-lg mb-2">Primer Vehículo</p>
                  <p className="font-heading text-3xl font-bold text-amarillo-seguridad">BROCKWAY 1940</p>
                  <p className="text-sm text-gray-300 mt-2">Carro lavador de calles donado por la Municipalidad</p>
                </div>
              </div>
            </div>
          </section>

          {/* Actividad de la Brigada */}
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-6 border-l-4 border-rojo-bombero pl-4">
              Actividad de la Brigada
            </h2>
            <p className="text-gris-medio mb-4">
              Transcurrieron casi tres años de intensa actividad, recibieron instrucción y academias del Cuerpo de Bomberos y trabajaron apoyando en incendios forestales al Cuerpo de Bomberos y a <strong>CONAF</strong>.
            </p>
          </section>

          {/* El Terremoto */}
          <section className="bg-gradient-to-r from-rojo-bombero to-rojo-oscuro text-white rounded-2xl p-8 md:p-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
              El Terremoto del 9 de Julio de 1971
            </h2>
            <p className="text-lg mb-4">
              A raíz del terremoto que abarcó las provincias de <strong>Coquimbo, Santiago, Aconcagua y Valparaíso</strong>, la Brigada distribuyó:
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center my-8">
              <p className="font-heading text-5xl md:text-6xl font-bold text-amarillo-seguridad mb-2">
                1.400.000
              </p>
              <p className="text-xl">Litros de agua distribuidos</p>
            </div>
            <p className="text-lg">
              Las poblaciones atendidas fueron: <strong>Nueva Aurora, Villa Linda, Villa Londres, Las Colinas y Viña del Mar Alto</strong>, todas poblaciones de Viña del Mar.
            </p>
          </section>

          {/* Fundación de la Compañía */}
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-6 border-l-4 border-rojo-bombero pl-4">
              Fundación de la Séptima Compañía
            </h2>
            <div className="bg-gris-claro rounded-lg p-8 mb-8">
              <p className="text-gris-medio text-lg">
                El <strong>21 de septiembre de 1971</strong>, por acuerdo del Directorio General del Cuerpo de Bomberos de Viña del Mar, la Brigada Forestal de Viña del Mar Alto pasó a ser <strong>Compañía regular</strong> del Cuerpo de Bomberos, bajo el número ordinal <strong>siete</strong> y con el nombre de <strong>Séptima Compañía de Bomberos, Bomba Viña del Mar Alto</strong>.
              </p>
            </div>
          </section>

          {/* Acta de Fundación Completa */}
          <section className="bg-[#1A1A1A] text-white rounded-2xl overflow-hidden">
            <div className="bg-rojo-bombero p-6">
              <h2 className="font-heading text-2xl font-bold text-center text-amarillo-seguridad">
                ACTA DE FUNDACIÓN
              </h2>
              <p className="text-center text-white/80">
                DE LA SÉPTIMA COMPAÑÍA DE BOMBEROS DE VIÑA DEL MAR
              </p>
            </div>
            <div className="p-8 space-y-6">
              <p className="text-gray-300 leading-relaxed">
                En Viña del Mar, a <strong>21 de septiembre de 1971</strong>, a las <strong>19:45 hrs</strong>, en el local <strong>Club de Campo El Refugio</strong>, bajo presidencia de su Director Titular, Señor <strong>Carlos Jiménez Díaz</strong> y actuando como Secretario Subrogante, el Señor <strong>Marcos Fardella Díaz</strong>, por ausencia del titular Señor Sergio Fuenzalida Almendroza, se reunió en Sesión Solemne la Brigada Forestal de Viña del Mar Alto, con el fin de constituirse en Compañía regular del Cuerpo de Bomberos de Viña del Mar, bajo el número ordinal Siete y con el nombre de Séptima Compañía de Bomberos, Bomba Viña del Mar Alto.
              </p>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="font-heading text-lg font-bold text-rojo-bombero mb-3">Autoridades Presentes:</h3>
                <ul className="space-y-2 text-gray-300">
                  {autoridadesPresentes.map((autoridad, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rojo-bombero">•</span>
                      {autoridad}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="font-heading text-lg font-bold text-rojo-bombero mb-3">Directores de Compañía:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300">
                  {directoresCompania.map((director, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rojo-bombero">•</span>
                      {director}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="font-heading text-lg font-bold text-rojo-bombero mb-3">Miembros Honorarios del Directorio General:</h3>
                <ul className="flex flex-wrap gap-4 text-gray-300">
                  {miembrosHonorarios.map((miembro, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-rojo-bombero">•</span>
                      {miembro}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-6 mt-6">
                <h3 className="font-heading text-lg font-bold text-amarillo-seguridad mb-3">Voluntarios Fundadores de la Séptima Compañía:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {voluntariosFundadores.map((nombre, i) => (
                    <div key={i} className="text-gray-300 text-sm py-1">
                      {nombre}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Primer discurso del Director */}
          <section className="bg-gris-claro rounded-lg p-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-6">
              Palabras del Director Carlos Jiménez Díaz
            </h2>
            <div className="space-y-4 text-gris-medio">
              <p>
                El Señor Director hizo uso de la palabra para agradecer su designación y para recordar que la Brigada Forestal se había formado en el año 1968 a raíz de los incendios forestales que amenazaron el sector.
              </p>
              <p>
                Explicó el esfuerzo que había significado por parte de los voluntarios, la construcción de la <strong>Sala de Máquinas</strong> para albergar al viejo camión Brockway y de dos carros dados de baja por la <strong>ENAP</strong>.
              </p>
              <p>
                Expresó la dedicación que pusieron los voluntarios en el acondicionamiento de dichos carros, lo que permitió que, a raíz del sismo de este año, se pudieran repartir <strong>un millón cuatrocientos mil litros de agua</strong> en las poblaciones necesitadas.
              </p>
              <p className="italic">
                Por último, rindió un sentido homenaje a las damas, madres y esposas de los voluntarios por la cooperación y estímulo que siempre dispensaron en la creación de la Compañía.
              </p>
            </div>
          </section>

          {/* Bienvenida del Superintendente */}
          <section className="bg-rojo-oscuro text-white rounded-lg p-8">
            <h2 className="font-heading text-2xl font-bold text-amarillo-seguridad mb-4">
              Bienvenida del Superintendente
            </h2>
            <p className="text-gray-200 italic leading-relaxed">
              "Hizo la historia del Cuerpo de Bomberos de Viña del Mar y las necesidades que obligaron a aumentar el número de las Compañías regulares, y tras emotivas palabras, dio calurosa bienvenida a nombre de la Institución a la nueva Séptima Compañía, junto con agradecer a sus voluntarios la preciosa y abnegada colaboración que desde las filas de la nueva Compañía prestarán para seguridad y tranquilidad de los habitantes de nuestra ciudad."
            </p>
            <p className="text-right mt-4 text-gray-400">— Sr. Juan Guillermo Brunet Barreiro</p>
          </section>

          {/* Primeros Obsequios */}
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-6 border-l-4 border-rojo-bombero pl-4">
              Primeros Obsequios Recibidos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gris-claro rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-rojo-bombero/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📜</span>
                </div>
                <h3 className="font-heading font-bold text-rojo-oscuro mb-2">Pergamino Recordatorio</h3>
                <p className="text-gris-medio text-sm">Entregado por la Comunidad de Viña del Mar Alto, a través del Señor Claudio Ortiz Urzúa</p>
              </div>
              <div className="bg-gris-claro rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-rojo-bombero/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚩</span>
                </div>
                <h3 className="font-heading font-bold text-rojo-oscuro mb-2">Nuevo Estandarte</h3>
                <p className="text-gris-medio text-sm">Entregado por el Director de la Cuarta Compañía, Señor Julio Rubio Gómez</p>
              </div>
              <div className="bg-gris-claro rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-rojo-bombero/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔦</span>
                </div>
                <h3 className="font-heading font-bold text-rojo-oscuro mb-2">Linterna Simbólica</h3>
                <p className="text-gris-medio text-sm">Entregada por la Sexta Compañía de Bomberos</p>
              </div>
            </div>
          </section>

          {/* Traslado del Cuartel */}
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-6 border-l-4 border-rojo-bombero pl-4">
              Traslado del Cuartel
            </h2>
            <div className="bg-gris-claro rounded-lg p-8">
              <p className="text-gris-medio mb-4">
                En <strong>1974</strong> la Compañía se debió trasladar al Cuartel General, un fuerte temporal había destruido su Cuartel.
              </p>
              <p className="text-gris-medio mb-4">
                Fue acogida hasta <strong>diciembre de 1975</strong>, cuando se trasladó a su actual y definitiva ubicación en <strong>calle Logroño 1289</strong> en Viña del Mar Alto, gracias a la donación del terreno que les hizo el <strong>Club de Campo El Refugio</strong>.
              </p>
              <div className="bg-rojo-bombero text-white rounded-lg p-4 inline-flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <span className="font-heading font-bold">Logroño 1289, Viña del Mar Alto</span>
              </div>
            </div>
          </section>

          {/* Especialidad */}
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-6 border-l-4 border-rojo-bombero pl-4">
              Especialidad
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gris-claro rounded-lg p-6">
                <h3 className="font-heading text-xl font-bold text-rojo-oscuro mb-4">Historia de la Especialidad</h3>
                <p className="text-gris-medio mb-4">
                  La Séptima Compañía desde su fundación se destacó en el combate de <strong>incendios forestales</strong>.
                </p>
                <p className="text-gris-medio">
                  Desde los años ochenta, también se especializó en el combate de <strong>incendios en altura</strong>.
                </p>
              </div>
              <div className="bg-rojo-oscuro text-white rounded-lg p-6 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-heading text-sm text-gray-300 mb-2">Especialidad Actual</p>
                  <p className="font-heading text-3xl font-bold text-amarillo-seguridad mb-2">ESTRUCTURAL</p>
                  <p className="font-heading text-3xl font-bold text-amarillo-seguridad">Y FORESTAL</p>
                </div>
              </div>
            </div>
          </section>

          {/* Línea de Tiempo */}
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-rojo-bombero mb-6 border-l-4 border-rojo-bombero pl-4">
              Línea de Tiempo
            </h2>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-rojo-bombero transform md:-translate-x-1/2" />
              <div className="space-y-8">
                {[
                  { year: "1968", event: "Fundación de la Brigada Forestal de Viña del Mar Alto", icon: "🔥" },
                  { year: "Julio 1971", event: "Distribución de 1.400.000 litros de agua tras terremoto", icon: "💧" },
                  { year: "21 Sep 1971", event: "Fundación de la Séptima Compañía de Bomberos", icon: "🎉" },
                  { year: "1974", event: "Traslado temporal al Cuartel General por temporal", icon: "🌪️" },
                  { year: "Dic 1975", event: "Traslado a calle Logroño 1289", icon: "📍" },
                  { year: "1980s", event: "Especialización en incendios en altura", icon: "🏗️" },
                  { year: "25 Nov 1995", event: "Canje con Vigésima Compañía Apoquindo", icon: "🤝" },
                ].map((item, index) => (
                  <div key={index} className={`relative flex items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 md:text-right">
                      {index % 2 === 0 ? (
                        <div className="bg-gris-claro rounded-lg p-4 inline-block">
                          <p className="font-heading text-2xl font-bold text-rojo-bombero">{item.year}</p>
                          <p className="text-gris-medio">{item.event}</p>
                        </div>
                      ) : (
                        <div className="hidden md:block" />
                      )}
                    </div>
                    <div className="absolute left-4 md:left-1/2 w-10 h-10 bg-rojo-bombero rounded-full flex items-center justify-center transform -translate-x-1/2 border-4 border-white">
                      <span>{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      {index % 2 !== 0 ? (
                        <div className="bg-gris-claro rounded-lg p-4 inline-block">
                          <p className="font-heading text-2xl font-bold text-rojo-bombero">{item.year}</p>
                          <p className="text-gris-medio">{item.event}</p>
                        </div>
                      ) : (
                        <div className="md:hidden bg-gris-claro rounded-lg p-4 inline-block">
                          <p className="font-heading text-2xl font-bold text-rojo-bombero">{item.year}</p>
                          <p className="text-gris-medio">{item.event}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Actualidad */}
          <section className="bg-gradient-to-r from-rojo-bombero to-rojo-oscuro text-white rounded-2xl p-8 md:p-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-8">
              Actualidad
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center bg-white/10 rounded-lg p-6">
                <p className="font-heading text-5xl font-bold text-amarillo-seguridad">64</p>
                <p className="text-gray-200">Bomberos</p>
              </div>
              <div className="text-center bg-white/10 rounded-lg p-6">
                <p className="font-heading text-5xl font-bold text-amarillo-seguridad">3</p>
                <p className="text-gray-200">Bomberas</p>
              </div>
              <div className="text-center bg-white/10 rounded-lg p-6">
                <p className="font-heading text-5xl font-bold text-amarillo-seguridad">1971</p>
                <p className="text-gray-200">Año de Fundación</p>
              </div>
              <div className="text-center bg-white/10 rounded-lg p-6">
                <p className="font-heading text-5xl font-bold text-amarillo-seguridad">1995</p>
                <p className="text-gray-200">Canje Apoquindo</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
              <p className="text-lg text-center mb-4">
                Su uniforme que inicialmente había sido de color <strong>granate</strong>, fue cambiado a color <strong>azul</strong>.
              </p>
              <p className="text-center">
                Tiene canje con la <strong>Vigésima Compañía de Bomberos Apoquindo</strong>, del Cuerpo de Bomberos de Santiago, desde el <strong>25 de noviembre de 1995</strong>.
              </p>
            </div>

            <div className="text-center">
              <p className="font-heading text-sm text-gray-300 mb-2">NUESTRO LEMA</p>
              <p className="font-heading text-3xl md:text-4xl font-bold text-amarillo-seguridad tracking-wider">
                ABNEGACIÓN, SERVICIO Y DISCIPLINA
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
