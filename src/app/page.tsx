/* eslint-disable @next/next/no-img-element */
import { Poppins } from 'next/font/google'

import { Button } from '@/components/ui/button'

const font = Poppins({ weight: ['400', '600', '800'], subsets: ['latin'] })

// TODO: refactor: (split into componets)
// TODO: refactor: (user Image from next/img instead img tag. but check positions a sizes when switch them)
// TODO: style: improve footer
// TODO: style: add some animations or lottie images

export default function Home() {
	return (
		<div className={font.className}>
			<nav className="bg-background/50 sticky top-0 z-50 p-3 md:px-6 px-3 flex justify-between items-center backdrop-blur-md">
				<span>PicTeller</span>
				<Button className="font-semibold">Pruebalo ahora</Button>
			</nav>
			<header className="relative min-h-[85dvh] bg-gradient-to-l to-orange-800 from-orange-600 flex items-center justify-center gap-5 flex-col">
				<div className=" z-0 absolute top-0 left-0 w-full h-full overflow-hidden">
					<img
						src="https://cdn-icons-png.flaticon.com/128/685/685842.png"
						className="md:size-[350px] size-[250px] absolute -top-16 right-0  opacity-30 select-none pointer-events-none"
						alt=""
					/>
					<img
						src="https://cdn-icons-png.flaticon.com/128/685/685842.png"
						className="md:size-[320px] size-[220px] absolute -bottom-20 left-0   opacity-20 select-none pointer-events-none"
						alt=""
					/>
				</div>
				<img
					src="https://cdn-icons-png.flaticon.com/128/8435/8435425.png"
					alt=""
					className="sm:w-[190px] w-[120px] absolute left-0 top-0 select-none pointer-events-none"
				/>
				<img
					src="https://cdn-icons-png.flaticon.com/128/8435/8435425.png"
					alt=""
					className="sm:w-[190px] w-[120px] absolute right-0 bottom-0 rotate-180 select-none pointer-events-none"
				/>

				<div className="relative">
					<img
						src="https://cdn-icons-png.flaticon.com/128/1235/1235127.png"
						alt=""
						className="md:size-[100px] size-[80px] absolute -top-[68px] -left-[40px] -rotate-[20deg]  hover:scale-105 transition-all"
					/>
					<h1 className="md:text-9xl sm:text-8xl text-6xl font-extrabold ">
						PicTeller
					</h1>
				</div>
				<div className="text-center text-xl relative z-0 md:px-0 p-2">
					<span className="text-3xl font-semibold leading-tight">
						Impulsa tu marketing
					</span>
					<p className="text-pretty max-w-xl mt-2 block leading-tight">
						Crea campañas visuales y narrativas cautivadoras de forma
						automatizada y sin complicaciones.
					</p>
				</div>
				<Button size="lg" className="z-0 font-semibold">
					Pruebalo ahora
				</Button>
			</header>
			<main className="p-5 max-w-6xl mx-auto overflow-hidden">
				<div className="relative w-fit mt-10">
					<h2 className="md:text-5xl text-4xl font-semibold inline-block md:text-start text-center leading-tight">
						¿Por que usar PicTeller?
					</h2>
				</div>
				<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:place-items-start place-items-center md:gap-10 gap-16 md:pt-0 pt-16	">
					<div className="flex flex-col justify-center items-center gap-8 relative md:mt-[200px] mt-[0]">
						<div className="h-[140px] w-[10px] bg-white/20 absolute -top-[100px] -translate-y-1/2 left-1/2 md:block hidden"></div>
						<h5 className="text-xl font-semibold leading-tight text-center">
							Automatización de Contenido
						</h5>
						<figcaption className=" flex-none size-[230px] rounded bg-purple-900 relative">
							<img
								src="https://cdn-icons-png.flaticon.com/128/3538/3538416.png"
								className="size-[100px] absolute top-[50px] -left-[50px] z-10 -rotate-6"
								alt=""
							/>
							<svg
								className="absolute left-5 top-5 -z-10 h-full w-full"
								xmlns="http://www.w3.org/2000/svg"
							>
								<defs>
									<pattern
										id="a"
										patternUnits="userSpaceOnUse"
										width="32"
										height="32"
										patternTransform="scale(1.1) rotate(0)"
									>
										<rect
											x="0"
											y="0"
											width="100%"
											height="100%"
											fill="#2b2b3100"
										/>
										<path
											d="M40 16h-6m-4 0h-6m8 8v-6m0-4V8M8 16H2m-4 0h-6m8 8v-6m0-4V8"
											stroke-linecap="square"
											stroke-width="1"
											stroke="#9c27b0ff"
											fill="none"
										/>
										<path
											d="M16-8v6m0 4v6m8-8h-6m-4 0H8m8 24v6m0 4v6m8-8h-6m-4 0H8"
											stroke-linecap="square"
											stroke-width="1"
											stroke="#9c27b0ff"
											fill="none"
										/>
									</pattern>
								</defs>
								<rect
									width="800%"
									height="800%"
									transform="translate(0,0)"
									fill="url(#a)"
								/>
							</svg>
						</figcaption>
						<p className="text-pretty inline-block mt-3 w-3/4 md:text-start text-center">
							{' '}
							Genera campañas visuales y narrativas atractivas de manera
							automática, ahorrando tiempo y esfuerzo a las PYMEs.
						</p>
					</div>

					<div className="flex flex-col justify-center items-center gap-8 md:mt-[100px] mt-0">
						<h5 className="text-xl font-semibold leading-tight text-center">
							Transformación Temática
						</h5>
						<figcaption className=" flex-none size-[230px] rounded bg-purple-900 relative">
							<svg
								className="absolute left-5 top-5 -z-10 h-full w-full"
								xmlns="http://www.w3.org/2000/svg"
							>
								<defs>
									<pattern
										id="a"
										patternUnits="userSpaceOnUse"
										width="32"
										height="32"
										patternTransform="scale(1.1) rotate(0)"
									>
										<rect
											x="0"
											y="0"
											width="100%"
											height="100%"
											fill="#2b2b3100"
										/>
										<path
											d="M40 16h-6m-4 0h-6m8 8v-6m0-4V8M8 16H2m-4 0h-6m8 8v-6m0-4V8"
											stroke-linecap="square"
											stroke-width="1"
											stroke="#9c27b0ff"
											fill="none"
										/>
										<path
											d="M16-8v6m0 4v6m8-8h-6m-4 0H8m8 24v6m0 4v6m8-8h-6m-4 0H8"
											stroke-linecap="square"
											stroke-width="1"
											stroke="#9c27b0ff"
											fill="none"
										/>
									</pattern>
								</defs>
								<rect
									width="800%"
									height="800%"
									transform="translate(0,0)"
									fill="url(#a)"
								/>
							</svg>
						</figcaption>
						<p className="text-pretty inline-block mt-3 w-3/4 md:text-start text-center">
							Permite a los usuarios convertir imágenes de productos en
							temáticas específicas (como Halloween o Navidad) para atraer a su
							audiencia.
						</p>
					</div>

					<div className="flex flex-col justify-center items-center gap-8 relative mt-[0px] ">
						<div className="h-[140px] w-[10px] bg-white/20 absolute -bottom-[246px] -translate-y-1/2 left-1/2"></div>
						<h5 className="text-xl font-semibold leading-tight text-center">
							Multicanalidad.
						</h5>
						<figcaption className=" flex-none size-[230px] rounded bg-purple-900 relative">
							<img
								src="https://cdn-icons-png.flaticon.com/128/3538/3538416.png"
								className="size-[100px] absolute top-[140px]  -right-[40px] -rotate-12 z-10 scale-x-[-1]"
								alt=""
							/>
							<svg
								className="absolute left-5 top-5 -z-10 h-full w-full"
								xmlns="http://www.w3.org/2000/svg"
							>
								<defs>
									<pattern
										id="a"
										patternUnits="userSpaceOnUse"
										width="32"
										height="32"
										patternTransform="scale(1.1) rotate(0)"
									>
										<rect
											x="0"
											y="0"
											width="100%"
											height="100%"
											fill="#2b2b3100"
										/>
										<path
											d="M40 16h-6m-4 0h-6m8 8v-6m0-4V8M8 16H2m-4 0h-6m8 8v-6m0-4V8"
											stroke-linecap="square"
											stroke-width="1"
											stroke="#9c27b0ff"
											fill="none"
										/>
										<path
											d="M16-8v6m0 4v6m8-8h-6m-4 0H8m8 24v6m0 4v6m8-8h-6m-4 0H8"
											stroke-linecap="square"
											stroke-width="1"
											stroke="#9c27b0ff"
											fill="none"
										/>
									</pattern>
								</defs>
								<rect
									width="800%"
									height="800%"
									transform="translate(0,0)"
									fill="url(#a)"
								/>
							</svg>
						</figcaption>
						<p className="text-pretty inline-block mt-3 w-3/4 md:text-start text-center">
							Las historias generadas se pueden utilizar en diversos canales de
							marketing, incluyendo redes sociales, e-commerce, campañas de
							email y blogs, mejorando así la visibilidad y el engagement
						</p>
					</div>
				</div>
			</main>

			<footer className="p-5 bg-purple-600/10 mt-20 text-center">
				picteller
			</footer>
		</div>
	)
}
