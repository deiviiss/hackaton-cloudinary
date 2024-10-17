import { NextResponse } from 'next/server'

import { end, start } from '@/helpers/performance'
import { bestImage, generateCaption, textOverlayImage } from '@/lib/cloudinary'
import { generateStory } from '@/lib/openai'
import prisma from '@/lib/prisma'
import { StoryTellerSchema } from '@/schemas/storyteller'

export async function POST(request: Request) {
	start('storyteller')
	try {
		const { imagesId, theme, description } = StoryTellerSchema.parse(
			await request.json(),
		)

		// promised images from prisma
		const promisedImageResult = imagesId.map((id) =>
			prisma.userImageResult.findUnique({ where: { id } }),
		)

		const arrayImageResult = await Promise.all(promisedImageResult)

		// filter results that are null
		const validImageResults = arrayImageResult.filter(
			(imageResult) => imageResult !== null,
		)

		if (!validImageResults.length) {
			return NextResponse.json(
				{ error: 'No se han encontrado imágenes' },
				{ status: 400 },
			)
		}

		// generate captions for each image
		const promisedGenerateCaption = validImageResults.map((imageResult) =>
			generateCaption(imageResult.path),
		)

		const arrayGenerateCaption = await Promise.all(promisedGenerateCaption)

		// get the captions in a single string, include the description from the request
		const responseCaptionWithDescription = arrayGenerateCaption
			.reduce(
				(acc, curr, index) => {
					const captionText =
						curr.info.detection.captioning.status === 'complete'
							? `${index + 2}. ${curr.info.detection.captioning.data.caption}\n`
							: ''

					return acc + captionText
				},
				description
					? `1. ${description.trim()}${description[description.length - 1] === '.' ? '' : '.'}\n`
					: '',
			)
			.trim()

		if (!responseCaptionWithDescription) {
			return NextResponse.json(
				{
					error:
						'No se ha generado ninguna descripción o no se ha realizado el generation captions de las imágenes',
				},
				{ status: 400 },
			)
		}

		console.log(responseCaptionWithDescription, 'RESPONSE CAPTION')

		// generate story text from open ai
		const generateStoryText = await generateStory(
			responseCaptionWithDescription,
			theme,
		)

		// falta incorporar la parte de las redes sociales cortando la imagen por dimensiones
		// TODO: add social medias

		console.log(generateStoryText, 'RESPONSE STORY')

		// add text to the first image
		const newImageWithText = await textOverlayImage(
			validImageResults[0].path,
			// 'https://res.cloudinary.com/dlixnwuhi/image/upload/v1729116443/hbclomk1azwdp1optstm.png',
			generateStoryText,
			description,
		)

		// best image with cloudinary restore from url
		const bestNewImageWithText = await bestImage(newImageWithText.secure_url)

		// update image with new caption
		const updateImage = await prisma.userImageResult.update({
			where: {
				id: validImageResults[0].id,
			},
			data: {
				captionGenerated: generateStoryText,
				// socialPosts: {
				//   create: {
				//     descriptionPromt: description,
				//     descriptionResult: generateStoryText,

				//   }
				// }
			},
		})

		return NextResponse.json(
			{
				newImage: updateImage,
				url: newImageWithText.secure_url,
				urlBest: bestNewImageWithText,
			},
			{ status: 200 },
		)
	} catch (error: unknown) {
		console.error('Error in POST storyteller', error)
		return NextResponse.json(
			{ error: 'An error occurred in storyteller' },
			{ status: 500 },
		)
	} finally {
		end()
	}
}
