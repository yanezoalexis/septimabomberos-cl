import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://septimabomberos-cl.vercel.app"
  
  const publicRoutes = [
    "",
    "/historia",
    "/rescate-desnivel",
    "/guardia-nocturna",
    "/material-mayor",
    "/noticias",
    "/contacto",
  ]

  const routes = publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  return routes
}
