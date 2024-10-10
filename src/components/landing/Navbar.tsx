import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
// TODO: change button link path to rigth path
const Navbar = () => {
	return (
		<nav className="bg-background/50 sticky top-0 z-50 p-3 md:px-6 px-3 flex justify-between items-center backdrop-blur-md">
			<div className="flex items-center gap-2">
				<div className="size-[20px] relative ">
					<Image
						src="https://cdn-icons-png.flaticon.com/128/1235/1235127.png"
						alt="magic hat"
						className=""
						fill
						loading="eager"
					/>
				</div>
				<span>PicTeller</span>
			</div>

			<Link href="/form">
				<Button className="font-semibold">Pruebalo ahora</Button>
			</Link>
		</nav>
	)
}
export default Navbar
