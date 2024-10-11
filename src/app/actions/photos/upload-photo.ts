export const uploadPhoto = async (formData: FormData) => {
	try {
		const response = await fetch('/api/photos', {
			method: 'POST',
			body: formData,
		})

		if (!response.ok) {
			throw new Error('Error en la subida de las imágenes')
		}

		const responseData = await response.json()

		return {
			ok: true,
			data: responseData,
		}
	} catch (error) {
		return {
			ok: false,
			message: 'Error en la subida de las imágenes',
		}
	}
}
