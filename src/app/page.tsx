import { useEffect } from 'react'

export default function Home() {
	useEffect(() => {
		fetch('/api/prueba-borrar', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}, [])
	return <h1>Test</h1>
}
