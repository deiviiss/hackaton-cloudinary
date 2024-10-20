import { NextResponse } from 'next/server'

import { uploadImageToCloudinary } from '@/lib/cloudinary'
import { THEMA } from '@/types'
import { FormOutputData } from '@/types/api/photo'

// Define the types for the form data
interface FormInputData {
	image: File
	theme: THEMA
	description: string
}

export async function POST(request: Request) {
	try {
		const formData = await request.formData()

		const image = formData.get('image') as File
		const theme = formData.get('theme') as THEMA
		const description = formData.get('description') as string

		// Validate required fields
		if (!image || !theme || !description) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 },
			)
		}

		// Upload the image to Cloudinary
		const cloudinaryResult = await uploadImageToCloudinary(image)

		// Validate the Cloudinary response
		if (!cloudinaryResult || !cloudinaryResult.secure_url) {
			return NextResponse.json(
				{ error: 'Failed to upload image to Cloudinary' },
				{ status: 500 },
			)
		}

		// Create the response object
		const response: FormOutputData = {
			imageId: cloudinaryResult.public_id,
			url: cloudinaryResult.secure_url,
			theme: theme,
			description: description,
		}

		return NextResponse.json(response, { status: 200 })
	} catch (error: unknown) {
		return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
	}
}
