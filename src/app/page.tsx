import FirstSection from '@/components/landing/FirstSection'
import Hero from '@/components/landing/Hero'
import Navbar from '@/components/landing/Navbar'

// TODO: add section for one video app tutorial (optional)

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="p-5 max-w-6xl mx-auto overflow-hidden space-y-[100px]">
        {/* Section: ¿Por qué usar picteller?  */}
        <FirstSection />
      </main>
    </>
  )
}
