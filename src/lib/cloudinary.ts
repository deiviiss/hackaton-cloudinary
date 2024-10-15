import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

// Configuración de Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadImageToCloudinary = async (image: string) => {
	try {
		const uploadResponse = await cloudinary.uploader.upload(image, {
			folder: 'hackathon',
		})

		fs.unlinkSync(image)
		return uploadResponse
	} catch (error) {
		fs.unlinkSync(image)
		throw new Error('Error uploading image to Cloudinary')
	}
}

const updateBackgroundImage = async (image: string, promp: string) => {
	return cloudinary.image(image, {
		effect: 'gen_background_replace:' + promp,
	})
}

// Generate a caption for an image : https://cloudinary.com/blog/ai-powered-captioning-add-on
export const generateCaption = async (image: string) => {
	return cloudinary.uploader.upload(image, {
		detection: 'captioning',
	})
}

export const textOverlayImage = async (image: string, text: string) => {
	return cloudinary.uploader.upload(image, {
		transformation: [
			// {
			// 	overlay: {
			// 		font_family: 'Lobster', // Fuente más atractiva para marketing
			// 		font_size: 60, // Tamaño ajustado para evitar desbordamiento
			// 		font_weight: 'bold',
			// 		text,
			// 	},
			// 	color: '#FF5733', // Color vibrante para el texto
			// 	gravity: 'south', // Posición del texto en la parte inferior
			// 	y: 20, // Ajuste vertical para separarlo del borde
			// 	width: 1500, // Ancho máximo para que el texto no se desborde
			// 	crop: 'fit', // Ajusta el texto dentro del ancho especificado
			// 	background: '#000000AA', // Fondo negro semitransparente para mejorar visibilidad
			// 	// border: '5px_solid_rgb:FFFFFF', // Bord
			// },
			{
				overlay: {
					font_family: 'Creepster', // Fuente temática de Halloween
					font_size: 60,
					font_weight: 'bold',
					text_align: 'center', // Alineación centrada para el texto
					text,
				},
				color: '#FFA500', // Naranja claro vibrante (Color de la calabaza)
				gravity: 'south', // Mantener el texto en la parte inferior
				y: 20, // Ajuste vertical desde la parte inferior
				width: 1500, // Ancho máximo para evitar desbordamiento
				crop: 'fit',
				background: '#000000AA',
				effect: 'shadow:50', // Sombra para darle profundidad y un toque espeluznante
				// opacity: 80, // Ligera opacidad para integrarlo mejor en la imagen
			},
		],
	})
}

export { cloudinary, uploadImageToCloudinary, updateBackgroundImage }
