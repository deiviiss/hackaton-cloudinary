import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

// TODO: change button link path to rigth path

const Hero = () => {
	return (
		<header className="relative min-h-[85dvh] bg-gradient-to-l to-orange-800 from-orange-600 flex items-center justify-center gap-5 flex-col">
			<div className=" z-0 absolute top-0 left-0 w-full h-full overflow-hidden">
				<div className="md:size-[350px] size-[250px] absolute -top-16 right-0  opacity-30">
					<Image
						src="https://cdn-icons-png.flaticon.com/128/685/685842.png"
						className="select-none pointer-events-none"
						alt="halloween pumpkin"
						fill
						loading="eager"
					/>
				</div>
				<div className="md:size-[320px] size-[220px] absolute -bottom-20 left-0 opacity-20">
					<Image
						src="https://cdn-icons-png.flaticon.com/128/685/685842.png"
						className="select-none pointer-events-none"
						alt="halloween pumpkin"
						fill
						loading="eager"
					/>
				</div>
			</div>
			<div className="sm:size-[190px] size-[120px] absolute left-0 top-0 ">
				<Image
					src="https://cdn-icons-png.flaticon.com/128/8435/8435425.png"
					alt="spider web"
					fill
					loading="eager"
					className="select-none pointer-events-none"
				/>
			</div>
			<div className="sm:size-[230px] size-[120px] absolute right-0 bottom-0 rotate-180 ">
				<Image
					src="https://cdn-icons-png.flaticon.com/128/8435/8435425.png"
					alt="spider web"
					className="select-none pointer-events-none"
					fill
					loading="eager"
				/>
			</div>

			<div className="relative tada ">
				<div className="md:size-[100px] size-[80px] absolute md:-top-[68px] -top-[60px] -left-[40px] -rotate-[20deg]  hover:scale-105 transition-all">
					<Image
						src="https://cdn-icons-png.flaticon.com/128/1235/1235127.png"
						alt="magic hat"
						className=""
						fill
						loading="eager"
					/>
				</div>
				<h1 className="md:text-9xl sm:text-8xl text-6xl font-extrabold">
					PicTeller
				</h1>
			</div>
			<div className="text-center text-xl relative z-0 md:px-0 p-2">
				<span className="text-3xl font-semibold leading-tight">
					Impulsa tu marketing
				</span>
				<p className="text-pretty max-w-xl mt-2 block leading-tight">
					Crea campañas visuales y narrativas cautivadoras de forma automatizada
					y sin complicaciones.
				</p>
			</div>
			<div className="z-0 flex flex-wrap gap-5 items-center justify-center">
				<Link href="/">
					<Button
						size="lg"
						className=" font-semibold flex items-center justify-center gap-2 pulse text-lg"
					>
						Pruebalo ahora
						<Sparkles className="size-6" />
					</Button>
				</Link>
			</div>
		</header>
	)
}
export default Hero
