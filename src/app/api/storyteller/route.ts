import { NextResponse } from 'next/server'

import { end, start } from '@/helpers/performance'
import { generateCaption } from '@/lib/cloudinary'
import { generateStory } from '@/lib/openai'
import prisma from '@/lib/prisma'
import { StoryTellerSchema } from '@/schemas/storyteller'

export async function POST(request: Request) {
	start('storyteller')
	try {
		const {
			imagesId,
			theme,
			description = '',
		} = StoryTellerSchema.parse(await request.json())

		// se podria tener una tabla StoryTeller que reuna las imagenes con un unico id de esa tabla que contiene las imagenes asi ya no se hace peticiones para cada imagen o mejor enviar las urls de las imagenes
		const promisedImageResult = imagesId.map((id) =>
			prisma.userImageResult.findUnique({ where: { id } }),
		)

		const arrayImageResult = await Promise.all(promisedImageResult)

		// Filtrar los resultados que son null
		const validImageResults = arrayImageResult.filter(
			(imageResult) => imageResult !== null,
		)

		// generate captions for each image
		const promisedGenerateCaption = validImageResults.map((imageResult) =>
			generateCaption(imageResult.path),
		)

		const arrayGenerateCaption = await Promise.all(promisedGenerateCaption)

		// get the captions in a single string
		const responseCaption = arrayGenerateCaption
			.reduce(
				(acc, curr, index) => {
					const captionText =
						curr.info.detection.captioning.status === 'complete'
							? `${description ? index + 2 : index + 1}. ${curr.info.detection.captioning.data.caption}\n`
							: ''

					return acc + captionText
				},
				description
					? `1. ${description.trim()}${description[description.length - 1] === '.' ? '' : '.'}\n`
					: '',
			)
			.trim()

		if (responseCaption === '') {
			return NextResponse.json(
				{ error: 'No se ha generado ninguna descripción' },
				{ status: 400 },
			)
		}

		const generateStoryText = await generateStory(responseCaption, theme)

		console.log(generateStoryText, 'RESPONSE FINAL')

		return NextResponse.json(
			{
				generateStoryText,
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
