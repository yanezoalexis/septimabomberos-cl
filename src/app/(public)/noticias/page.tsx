export const metadata = {
  title: "Noticias | Séptima Compañía de Bomberos Viña del Mar",
  description: "Últimas noticias y actualizaciones de la Séptima Compañía de Bomberos de Viña del Mar.",
}

const news = [
  {
    id: 1,
    title: "XX anniversario de la Séptima Compañía",
    date: "21 de Septiembre de 2021",
    excerpt: "Celebramos XX años de servicio ininterrumpido a la comunidad de Viña del Mar.",
    category: "Institucional",
  },
  {
    id: 2,
    title: "Capacitación de Rescate en Altura",
    date: "15 de Agosto de 2024",
    excerpt: "Nuestros voluntarios participaron en intensiva capacitación de rescate técnico.",
    category: "Capacitación",
  },
  {
    id: 3,
    title: "Nueva unidad B-7 joins our fleet",
    date: "Marzo de 2008",
    excerpt: "Se incorporó la unidad B-7, marcando un hito en la modernización de nuestra flota.",
    category: "Material Mayor",
  },
]

export default function Noticias() {
  return (
    <div className="py-16">
      <div className="container">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-rojo-oscuro mb-4">
          Noticias
        </h1>
        <p className="text-xl text-gris-medio mb-12">Últimas actualizaciones y novedades</p>

        <div className="space-y-6">
          {news.map((item) => (
            <article key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-rojo-bombero text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                  <time className="text-gris-medio text-sm">{item.date}</time>
                </div>
                <h2 className="font-heading text-xl font-bold text-rojo-oscuro mb-3">
                  {item.title}
                </h2>
                <p className="text-gris-medio">{item.excerpt}</p>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12 bg-gris-claro p-8 rounded-lg text-center">
          <h2 className="font-heading text-2xl font-bold text-rojo-oscuro mb-4">
            ¿Tienes noticias para compartir?
          </h2>
          <p className="text-gris-medio mb-6">
            Si eres voluntario y quieres publicar una noticia, contacta al Comandante de Compañía.
          </p>
          <a href="/contacto" className="inline-block bg-rojo-bombero text-white px-6 py-3 font-semibold rounded-md hover:bg-red-700 transition-colors">
            Contactar
          </a>
        </section>
      </div>
    </div>
  )
}
