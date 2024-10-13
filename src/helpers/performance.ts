const timings: { [key: string]: number } = {} // Almacenar los tiempos de inicio por label
let currentLabel: string | null = null // Almacenar el label activo

export function start(label: string) {
	console.log(`START ${label}...`)
	timings[label] = performance.now()
	currentLabel = label // Guardar el label activo
}

export function end() {
	if (currentLabel && timings[currentLabel]) {
		const endTime = performance.now()
		console.log(
			`END ${currentLabel} TIME: ${(endTime - timings[currentLabel]).toFixed(2)} ms`,
		)
		delete timings[currentLabel] // Eliminar el timing
		currentLabel = null // Resetear el label activo
	} else {
		console.error(`ERROR PERFORMANCE`)
	}
}
