import { NextResponse } from 'next/server'

import { updateBackgroundImage } from '@/lib/cloudinary'

export async function POST(request: Request) {
	try {
		const { imageUrl, description, imageId } = await request.json()

		if (!imageUrl || !description || !imageId) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 },
			)
		}

		const updatedBgResult: any = await updateBackgroundImage(
			imageUrl,
			description,
			imageId,
		)

		const respose = {
			imageId,
			imageUrl,
			description,
			updatedBgResult,
		}

		return NextResponse.json(respose, { status: 200 })
	} catch (error: unknown) {
		console.error('Error in POST /api/v1/upload:', error)
		return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
	}
}
