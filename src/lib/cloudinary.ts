import { v2 as cloudinary } from 'cloudinary'

import { SocialMedia } from '@/types/api/photo'

// Configuración de Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadImageToCloudinary = async (image: File) => {
	try {
		// Convert the image to a buffer
		const buffer = await image.arrayBuffer()
		const base64Image = Buffer.from(buffer).toString('base64')

		// Upload the image to Cloudinary
		const uploadResponse = await cloudinary.uploader.upload(
			`data:image/png;base64,${base64Image}`,
			{
				folder: 'hackathon',
			},
		)

		return uploadResponse
	} catch (error) {
		throw new Error('Error uploading image to Cloudinary')
	}
}

const updateBackgroundImage = async (
	image: string,
	prompt: string,
	id: string,
) => {
	const formattedPrompt = `prompt_${prompt}`
	let result = cloudinary.url(id, {
		effect: 'gen_background_replace:' + formattedPrompt,
		format: 'png',
	})

	result = result.replace(/\/v\d+\//, '/')

	return result
}

// Generate a caption for an image : https://cloudinary.com/blog/ai-powered-captioning-add-on
export const generateCaption = async (image: string) => {
	return cloudinary.uploader.upload(image, {
		detection: 'captioning',
	})
}

const themeStyles: Record<
	string,
	{
		colorText: string
		colorTextBackground: string
		colorBackground: string
		fontFamily: string
	}
> = {
	halloween: {
		colorText: '#FF4500', // Naranja brillante para Halloween
		colorTextBackground: '#000000AA', // Fondo semitransparente negro
		colorBackground: 'black', // Fondo de la imagen en negro
		fontFamily: 'Creepster', // Fuente temática de Halloween
	},
	christmas: {
		colorText: '#008000', // Verde festivo para Navidad
		colorTextBackground: '#FFFFFFAA', // Fondo semitransparente blanco
		colorBackground: '#FF0000', // Fondo rojo navideño
		fontFamily: 'Merriweather', // Fuente temática navideña
	},
	default: {
		colorText: '#FFFFFF', // Color de texto por defecto (blanco)
		colorTextBackground: '#000000AA', // Fondo semitransparente negro
		colorBackground: 'gray', // Fondo de la imagen en gris
		fontFamily: 'Arial', // Fuente genérica
	},
}

// text overlay image
const overlayImageId = 'yhamjq0byfixtz4hx1sw' // Reemplaza por el public_id de tu imagen superpuesta

export const textOverlayImage = async (
	image: string,
	text: string,
	description: string,
	theme: string = 'halloween',
) => {
	const styles = themeStyles[theme] || themeStyles.default

	return cloudinary.uploader.upload(image, {
		transformation: [
			// imagen de fondo para el description discount or other
			{
				overlay: overlayImageId, // Superponer la imagen
				width: 300, // Aumentar el tamaño de la imagen superpuesta
				height: 300, // Aumentar el tamaño de la imagen superpuesta
				crop: 'fit',
				gravity: 'north_east', // Colocar la imagen en la esquina superior derecha
				x: 10, // Ajustar la posición horizontal (opcional, puedes cambiar este valor)
				y: 10, // Ajustar la posición vertical (opcional, puedes cambiar este valor)
			},

			// texto para el discount
			{
				overlay: {
					font_family: styles.fontFamily, // Fuente temática de Halloween
					font_size: 55,
					font_weight: 'semibold',
					text: description, // Texto que deseas agregar
					text_align: 'center', // Alineación centrada para el texto
				},
				color: 'white', // Color del texto
				// background: colorTextBackground, // Color de fondo del texto
				gravity: 'north_east', // Posicionarlo a la derecha (puedes usar "west" para la izquierda)
				y: 80, // Centrado verticalmente respecto a la imagen superpuesta
				x: 50, // Ajuste horizontal, desplazando el texto más hacia la derecha
				width: 300, // Ancho máximo para evitar desbordamiento
				crop: 'fit',
			},

			// texto generado por openai
			{
				overlay: {
					// font_family: 'Creepster', // Fuente temática de Halloween
					font_family: styles.fontFamily,
					font_size: 35,
					font_weight: 'semibold',
					text_align: 'center', // Alineación centrada para el texto
					text,
					letter_spacing: 2, // Aumentar el espaciado entre letras (tracking)
					// line_spacing: 2, // Aumentar el espacio entre líneas (leading)
					stroke: '5px_solid_white', // Borde negro de 5px alrededor del texto
				},
				// color: '#FFA500', // Naranja claro vibrante (Color de la calabaza)
				color: styles.colorText,
				// color: 'white',
				gravity: 'south', // Mantener el texto en la parte inferior
				y: 20, // Ajuste vertical desde la parte inferior
				width: 800, // Ancho máximo para evitar desbordamiento
				crop: 'fit',
				background: styles.colorTextBackground,
				// effect: 'shadow:50', // Sombra para darle profundidad y un toque espeluznante
				// effect: 'grayscale',
				// opacity: 80, // Ligera opacidad para integrarlo mejor en la imagen
			},
			{ radius: 30 },
			{ angle: -2.5 },
			// { width: 1000 },
			{ background: styles.colorBackground },
		],
	})
}

// function best image with cloudinary restore from url
function applyTransformationToUrl(
	imageUrl: string,
	transformation: string = 'e_gen_restore/e_enhance/f_auto/q_auto',
): string {
	// add best but image opacity -> e_enhance
	// const transformation = 'e_gen_restore/e_enhance/f_auto/q_auto' //! Default transformation ensures compatibility with existing uses of the function

	// Split the URL into two parts: before and after "/upload/"
	const urlParts = imageUrl.split('/upload/')

	// Insert the transformations between "/upload/" and the rest of the URL
	const transformedUrl = `${urlParts[0]}/upload/${transformation}/${urlParts[1]}`

	return transformedUrl
}

export const bestImage = async (imageUrl: string) => {
	if (imageUrl.startsWith('https://res.cloudinary.com')) {
		imageUrl = applyTransformationToUrl(imageUrl)
	} else {
		throw new Error('Invalid Cloudinary URL')
	}

	return imageUrl
}

// Define the transformation rules for each social media platform
const socialMediaImageSettings: Record<SocialMedia, () => string> = {
	instagram: () => 'w_1080,h_1080,c_fill', // Square format for Instagram
	facebook: () => 'w_820,h_312,c_fill,g_auto', // Banner format for Facebook
	tiktok: () => 'w_1080,h_1920,c_fill,g_auto', // Vertical format 1080x1920 for TikTok
	x: () => 'w_1200,h_675,c_fill,g_auto', // Horizontal format for X (formerly Twitter)
	default: () => 'w_800,h_800,c_fit', // Default format if no social media is specified
}

// Function to get the best image URL for a social media platform
const generateSocialMediaUrl = async (
	imageUrl: string,
	socialMedia: SocialMedia,
): Promise<string> => {
	if (!imageUrl.startsWith('https://res.cloudinary.com')) {
		throw new Error('Invalid Cloudinary URL')
	}

	// Get the appropriate transformation or use the default one
	const transformation = (
		socialMediaImageSettings[socialMedia] || socialMediaImageSettings['default']
	)()

	// Apply the transformation to the URL
	return applyTransformationToUrl(imageUrl, transformation)
}

export {
	cloudinary,
	uploadImageToCloudinary,
	updateBackgroundImage,
	generateSocialMediaUrl,
}
