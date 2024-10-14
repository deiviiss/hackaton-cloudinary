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
		const { url, description, imageId, theme } = responseData
		const updateBackgroundResponse = await fetch('/api/photos/modify', {
			method: 'POST',
			body: JSON.stringify({
				imageUrl: url,
				imageId,
				description,
			}),
		})

		if (!updateBackgroundResponse.ok) {
			throw new Error('Error en la subida de las imágenes')
		}
		const updateData = await updateBackgroundResponse.json()

		return {
			ok: true,
			data: updateData,
		}
	} catch (error) {
		return {
			ok: false,
			message: 'Error en la subida de las imágenes',
		}
	}
}
