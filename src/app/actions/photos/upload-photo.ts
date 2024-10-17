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

		// ruta anterior como ejemplo para cambiar el background
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

		// storyteller lgdev
		const imageResult = await (
			await fetch('/api/storyteller', {
				method: 'POST',
				body: JSON.stringify({
					theme,
					description,
					imagesUrl: updateData.updatedBgResult,
				}),
			})
		).json()

		return {
			ok: true,
			// data: { ...updateData, theme },
			data: {
				imageId,
				imageUrl: url,
				description,
				updatedBgResult: imageResult.urlBest,
				theme,
			},
		}
	} catch (error) {
		return {
			ok: false,
			message: 'Error en la subida de las imágenes',
		}
	}
}
