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

// text overlay image
const overlayImageId = 'yhamjq0byfixtz4hx1sw' // Reemplaza por el public_id de tu imagen superpuesta
const overlayImageId2 = 'phfjihhdg8izthis5peq'
const colorText = '#FF4500'
const colorTextBackground = '#000000AA'
const colorBackground = 'black'
const fontFamily = 'Creepster'

export const textOverlayImage = async (
	image: string,
	text: string,
	description: string,
) => {
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

			// para el order now
			// {
			// 	overlay: overlayImageId2, // Superponer la imagen
			// 	aspect_ratio: '4:1',
			// 	width: 500, // Aumentar el tamaño de la imagen superpuesta
			// 	// height: 300, // Aumentar el tamaño de la imagen superpuesta
			// 	crop: 'fit',
			// 	gravity: 'east', // Colocar la imagen en la esquina superior derecha
			// 	x: 10, // Ajustar la posición horizontal (opcional, puedes cambiar este valor)
			// 	y: 10, // Ajustar la posición vertical (opcional, puedes cambiar este valor)
			// },

			// texto para el discount
			{
				overlay: {
					font_family: fontFamily, // Fuente temática de Halloween
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
					font_family: fontFamily,
					font_size: 35,
					font_weight: 'semibold',
					text_align: 'center', // Alineación centrada para el texto
					text,
					letter_spacing: 2, // Aumentar el espaciado entre letras (tracking)
					// line_spacing: 2, // Aumentar el espacio entre líneas (leading)
					stroke: '5px_solid_white', // Borde negro de 5px alrededor del texto
				},
				// color: '#FFA500', // Naranja claro vibrante (Color de la calabaza)
				color: colorText,
				// color: 'white',
				gravity: 'south', // Mantener el texto en la parte inferior
				y: 20, // Ajuste vertical desde la parte inferior
				width: 800, // Ancho máximo para evitar desbordamiento
				crop: 'fit',
				background: colorTextBackground,
				// effect: 'shadow:50', // Sombra para darle profundidad y un toque espeluznante
				// effect: 'grayscale',
				// opacity: 80, // Ligera opacidad para integrarlo mejor en la imagen
			},
			{ radius: 30 },
			{ angle: -2.5 },
			// { width: 1000 },
			{ background: colorBackground },
		],
	})
}

// function best image with cloudinary restore from url
function applyTransformationToUrl(imageUrl: string) {
	// Transformaciones a aplicar (puedes cambiar esto si es necesario)

	// add best but image opacity -> e_enhance
	const transformation = 'e_gen_restore/e_enhance/f_auto/q_auto'
	// const transformation = 'e_gen_restore/f_auto/q_auto'

	// Dividir la URL en dos partes: antes y después de "/upload/"
	const urlParts = imageUrl.split('/upload/')

	// Insertar las transformaciones entre "/upload/" y el resto de la URL
	const transformedUrl = `${urlParts[0]}/upload/${transformation}/${urlParts[1]}`

	return transformedUrl
}

export const bestImage = async (imageUrl: string) => {
	if (imageUrl.startsWith('https://res.cloudinary.com')) {
		imageUrl = applyTransformationToUrl(imageUrl)
	} else {
		console.log('Error en la mejora de la imagen')
	}

	return imageUrl
}

// https://cloudinary.com/documentation/transformation_overlays_tutorial#banner

// cloudinary.image("docs/family-beach.png", {transformation: [
//   {effect: "gen_remove:prompt_tail"},
//   {aspect_ratio: "2:3", gravity: "auto", width: 500, crop: "fill"},
//   {effect: "grayscale"},
//   {border: "15px_solid_brown", radius: 30},
//   {background: "black"},
//   {color: "brown", overlay: {font_family: "vibes", font_size: 52, text: "Wish%20you%20were%20here..."}},
//   {flags: "layer_apply", gravity: "north", y: 60},
//   {angle: -5}
//   ]})

export { cloudinary, uploadImageToCloudinary, updateBackgroundImage }

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
