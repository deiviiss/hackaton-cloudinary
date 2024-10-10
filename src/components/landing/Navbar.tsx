import { Button } from '@/components/ui/button'

const Navbar = () => {
	return (
		<nav className="bg-background/50 sticky top-0 z-50 p-3 md:px-6 px-3 flex justify-between items-center backdrop-blur-md">
			<span>PicTeller</span>
			<Button className="font-semibold">Pruebalo ahora</Button>
		</nav>
	)
}
export default Navbar
