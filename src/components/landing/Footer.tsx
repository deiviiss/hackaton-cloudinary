import Image from 'next/image'

const Footer = () => {
	return (
		<footer className="p-5 bg-purple-600/10 md:mt-40 mt-56 text-center md:space-y-5 space-y-8 relative pb-10">
			<div
				style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}
				className="bg-inherit w-full h-[80px] z-10 absolute -top-[80px] left-0 "
			></div>
			<div className="md:size-[150px] size-[110px] absolute right-16 md:-top-[140px] -top-[160px] z-20">
				<Image
					fill
					src="https://cdn-icons-png.flaticon.com/128/3472/3472159.png"
					className=""
					alt="zombie"
					loading="lazy"
				/>
			</div>
			<div className="md:size-[160px] size-[130px] absolute right-9 z-10 md:-top-[150px] -top-[175px]">
				<Image
					fill
					src="https://cdn-icons-png.flaticon.com/128/5766/5766502.png"
					className=""
					alt="tombstone"
					loading="lazy"
				/>
			</div>
			<div className="size-[90px]  absolute left-10 z-20 -top-[80px] lg:block hidden">
				<Image
					fill
					src="https://cdn-icons-png.flaticon.com/128/3472/3472159.png"
					className=""
					alt="zombie"
					loading="lazy"
				/>
			</div>
			<div className="size-[90px] absolute left-20 z-10 -top-[80px] lg:block hidden">
				<Image
					fill
					src="https://cdn-icons-png.flaticon.com/128/5766/5766502.png"
					className=""
					alt="tombstone"
					loading="lazy"
				/>
			</div>
			<div className="flex items-center gap-2 justify-center">
				<div className="size-[35px] relative ">
					<Image
						src="https://cdn-icons-png.flaticon.com/128/1235/1235127.png"
						alt="magic hat"
						className=""
						fill
						loading="eager"
					/>
				</div>
				<span className="font-semibold text-2xl underline">Picteller</span>
			</div>
			<div className="flex items-center justify-center w-fit gap-2 mx-auto italic md:text-base text-sm">
				Powered by{' '}
				<span className="bg-blue-800 p-1 px-2 font-semibold rounded-lg not-italic">
					Cloudinary
				</span>
				<svg
					className="md:size-10 size-7"
					viewBox="0 0 256 168"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid"
				>
					<path
						fill="#3448C5"
						d="M75.06 75.202a.7.7 0 0 1 .498.208l23.56 23.581a.7.7 0 0 1-.488 1.188h-6.022c-.39 0-.71.31-.721.7v53.015a12.724 12.724 0 0 0 3.71 8.949l3.52 3.52a.7.7 0 0 1-.487 1.187H70.85c-7.027 0-12.723-5.696-12.723-12.723v-53.948a.7.7 0 0 0-.7-.7h-5.938a.7.7 0 0 1-.509-1.188l23.581-23.58a.7.7 0 0 1 .499-.21Zm52.103 13.656a.7.7 0 0 1 .498.209l23.581 23.496a.7.7 0 0 1-.509 1.188h-6.022c-.39.011-.7.33-.7.72v39.423a12.724 12.724 0 0 0 3.69 8.949l3.541 3.52a.7.7 0 0 1-.509 1.187h-27.716c-7.027 0-12.724-5.696-12.724-12.723v-40.313c0-.39-.31-.71-.7-.721h-6a.7.7 0 0 1-.488-1.188l23.56-23.538a.7.7 0 0 1 .498-.209Zm52.114 13.51c.183 0 .36.075.487.207l23.581 23.56a.7.7 0 0 1-.487 1.209h-6.044a.7.7 0 0 0-.7.7v25.85a12.724 12.724 0 0 0 3.711 8.949l3.52 3.52a.7.7 0 0 1-.487 1.187h-27.801c-7.027 0-12.724-5.696-12.724-12.723v-26.784a.7.7 0 0 0-.7-.7h-5.937a.7.7 0 0 1-.488-1.208l23.58-23.56a.679.679 0 0 1 .489-.207ZM126.686-.002c37.04.27 69.71 24.323 80.964 59.614C235.16 63.202 255.8 86.54 256 114.28c0 22.895-14.319 41.921-37.438 49.842l-.86.289-1.06.339v-17.092c14.695-6.192 23.326-18.428 23.326-33.378-.075-21.097-16.782-38.323-37.78-39.126l-.709-.02h-6.361l-1.527-6.066c-7.494-30.93-35.08-52.79-66.905-53.015-26.187-.125-50.1 14.755-61.576 38.23l-2.36 4.861-4.454.467c-20.112 2.151-36.627 16.862-41.08 36.593-4.39 19.449 3.898 39.527 20.646 50.231l.734.46v18.025h-.106l-1.59-.721C11.744 152.636-2.99 126.08.51 98.616 4.012 71.153 24.938 49.142 52.19 44.258 66.912 16.851 95.575-.177 126.686-.002Z"
					/>
				</svg>
			</div>
		</footer>
	)
}
export default Footer
