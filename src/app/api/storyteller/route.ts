/* eslint-disable no-console */
import { NextResponse } from 'next/server'

import { end, start } from '@/helpers/performance'
import {
	bestImage,
	generateCaptionMode,
	textOverlayImage,
} from '@/lib/cloudinary'
import { generateStory } from '@/lib/openai'
import { StoryTellerSchema } from '@/schemas/storyteller'

export const maxDuration = 60 // This function can run for a maximum of 5 seconds

export async function POST(request: Request) {
	start('storyteller')
	try {
		const { imagesUrl, theme, description } = StoryTellerSchema.parse(
			await request.json(),
		)

		console.log('Aquí falla')
		const promisedGenerateCaption = await generateCaptionMode(imagesUrl)
		console.log('promisedGenerateCaption:', promisedGenerateCaption)
		const responseCaptionWithDescription =
			`1. ${description.trim()}${description[description.length - 1] === '.' ? '' : '.'}\n 2. ${promisedGenerateCaption.info.detection.captioning.data.caption}\n`.trim()

		// generate story text from open ai
		const generateStoryText = await generateStory(
			responseCaptionWithDescription,
			theme,
		)
		console.log('generateStoryText:', generateStoryText)
		// add text to the first image
		const newImageWithText = await textOverlayImage(
			imagesUrl,
			generateStoryText,
			description,
			theme,
		)
		console.log('newImageWithText:', newImageWithText)

		// best image with cloudinary restore from url
		const bestNewImageWithText = await bestImage(newImageWithText.secure_url)
		console.log('bestNewImageWithText:', bestNewImageWithText)

		return NextResponse.json({ urlBest: bestNewImageWithText }, { status: 200 })
	} catch (error: unknown) {
		console.error('An error occurred in storyteller', error)
		// aqui va a caer si o si
		// validar si es 423
		return NextResponse.json(
			{ error: 'An error occurred in storyteller' },
			{ status: 500 },
		)
	} finally {
		end()
	}
}
