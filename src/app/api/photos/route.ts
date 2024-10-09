import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData()
		const image = formData.get('image')
		const theme = formData.get('theme')
		const description = formData.get('description')

		if (!image || !theme || !description) {
			return NextResponse.json(
				{ error: 'All fields are required' },
				{ status: 400 },
			)
		}

		// const cloudinaryResult: any = await uploadImageToCloudinary(image)
		// const imageUrl = cloudinaryResult.secure_url

		// const processedImageUrl = await processImageWithGenBackground(
		// 	imageUrl,
		// 	theme,
		// )

		// 3. Responder con la URL de la imagen procesada
		return NextResponse.json(
			{
				// imageId: cloudinaryResult.public_id,
				// processedImageUrl: processedImageUrl,
				description: description,
			},
			{ status: 200 },
		)
	} catch (error: unknown) {
		console.error('Error in POST /api/v1/upload:', error)
		return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
	}
}
