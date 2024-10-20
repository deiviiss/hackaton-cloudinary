import { NextResponse } from 'next/server'

import { end, start } from '@/helpers/performance'
import { bestImage, generateCaption, textOverlayImage } from '@/lib/cloudinary'
import { generateStory } from '@/lib/openai'
import { StoryTellerSchema } from '@/schemas/storyteller'

export async function POST(request: Request) {
	start('storyteller')
	try {
		const { imagesUrl, theme, description } = StoryTellerSchema.parse(
			await request.json(),
		)
		const promisedGenerateCaption = await generateCaption(imagesUrl)

		const responseCaptionWithDescription =
			`1. ${description.trim()}${description[description.length - 1] === '.' ? '' : '.'}\n 2. ${promisedGenerateCaption.info.detection.captioning.data.caption}\n`.trim()

		// generate story text from open ai
		const generateStoryText = await generateStory(
			responseCaptionWithDescription,
			theme,
		)

		// add text to the first image
		const newImageWithText = await textOverlayImage(
			imagesUrl,
			generateStoryText,
			description,
			theme,
		)

		// best image with cloudinary restore from url
		const bestNewImageWithText = await bestImage(newImageWithText.secure_url)

		return NextResponse.json({ urlBest: bestNewImageWithText }, { status: 200 })
	} catch (error: unknown) {
		return NextResponse.json(
			{ error: 'An error occurred in storyteller' },
			{ status: 500 },
		)
	} finally {
		end()
	}
}
