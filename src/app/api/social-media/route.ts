import { NextResponse } from 'next/server'

import { end, start } from '@/helpers/performance'
import { generateSocialMediaUrl } from '@/lib/cloudinary'
import { SocialMediaSchema } from '@/schemas/social-media'

export async function POST(request: Request) {
	start('social-media')
	try {
		const { imageUrl, socialMedia } = SocialMediaSchema.parse(
			await request.json(),
		)

		const socialMediaUrl = await generateSocialMediaUrl(imageUrl, socialMedia)

		return NextResponse.json(socialMediaUrl, { status: 200 })
	} catch (error: unknown) {
		return NextResponse.json(
			{ error: 'An error occurred in socialMedia' },
			{ status: 500 },
		)
	} finally {
		end()
	}
}
