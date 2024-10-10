import { Poppins } from 'next/font/google'

import FirstSection from '@/components/landing/FirstSection'
import Footer from '@/components/landing/Footer'
import Hero from '@/components/landing/Hero'
import Navbar from '@/components/landing/Navbar'

const font = Poppins({ weight: ['400', '600', '800'], subsets: ['latin'] })

export default function Home() {
	return (
		<div className={font.className}>
			<Navbar />
			<Hero />
			<main className="p-5 max-w-6xl mx-auto overflow-hidden space-y-[100px]">
				{/* Section: ¿Por qué usar picteller?  */}
				<FirstSection />
			</main>
			<Footer />
		</div>
	)
}
