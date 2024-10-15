import { NextResponse } from 'next/server'

import { end, start } from '@/helpers/performance'
import { generateCaption, textOverlayImage } from '@/lib/cloudinary'
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

		// generate story text
		const generateStoryText = await generateStory(
			responseCaptionWithDescription,
			theme,
		)

		// add text to the first image
		const newImageWithText = await textOverlayImage(
			validImageResults[0].path,
			generateStoryText,
		)

		// const updateImage = await prisma.userImageResult.update({
		// 	where: {
		// 		id: validImageResults[0].id,
		// 	},
		// 	data: {

    //   },
		// })

		return NextResponse.json(
			{
				newImageWithText: newImageWithText.secure_url,
				imagesId,
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
