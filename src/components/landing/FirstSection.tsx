import Image from 'next/image'

const FirstSection = () => {
	return (
		<section>
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
						<div className="size-[100px] absolute top-[50px] -left-[50px] z-10 -rotate-6">
							<Image
								src="https://cdn-icons-png.flaticon.com/128/3538/3538416.png"
								alt="ghost-card"
								fill
								loading="lazy"
							/>
						</div>
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
										strokeLinecap="square"
										strokeWidth="1"
										stroke="#9c27b0ff"
										fill="none"
									/>
									<path
										d="M16-8v6m0 4v6m8-8h-6m-4 0H8m8 24v6m0 4v6m8-8h-6m-4 0H8"
										strokeLinecap="square"
										strokeWidth="1"
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
										strokeLinecap="square"
										strokeWidth="1"
										stroke="#9c27b0ff"
										fill="none"
									/>
									<path
										d="M16-8v6m0 4v6m8-8h-6m-4 0H8m8 24v6m0 4v6m8-8h-6m-4 0H8"
										strokeLinecap="square"
										strokeWidth="1"
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
						Permite a los usuarios convertir imágenes de productos en temáticas
						específicas (como Halloween o Navidad) para atraer a su audiencia.
					</p>
				</div>

				<div className="flex flex-col justify-center items-center gap-8 relative mt-[0px] ">
					<div className="h-[140px] w-[10px] bg-white/20 absolute -bottom-[246px] -translate-y-1/2 left-1/2"></div>
					<h5 className="text-xl font-semibold leading-tight text-center">
						Multicanalidad.
					</h5>
					<figcaption className=" flex-none size-[230px] rounded bg-purple-900 relative">
						<div className="size-[100px] absolute top-[140px]  -right-[40px] -rotate-12 z-10 scale-x-[-1]">
							<Image
								src="https://cdn-icons-png.flaticon.com/128/3538/3538416.png"
								alt="ghost-card"
								fill
								loading="lazy"
							/>
						</div>
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
										strokeLinecap="square"
										strokeWidth="1"
										stroke="#9c27b0ff"
										fill="none"
									/>
									<path
										d="M16-8v6m0 4v6m8-8h-6m-4 0H8m8 24v6m0 4v6m8-8h-6m-4 0H8"
										strokeLinecap="square"
										strokeWidth="1"
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
						marketing, incluyendo redes sociales, e-commerce, campañas de email
						y blogs, mejorando así la visibilidad y el engagement
					</p>
				</div>
			</div>
		</section>
	)
}
export default FirstSection
