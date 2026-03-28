import { Navigation, EmergencyBanner } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Analytics } from "@vercel/analytics/react"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <EmergencyBanner />
      <Navigation />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <Analytics />
    </>
  )
}
