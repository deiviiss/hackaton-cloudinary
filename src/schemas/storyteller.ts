import * as z from 'zod'

import { THEMA } from '@/types'

const arrayThemes = Object.values(THEMA) as [THEMA, ...THEMA[]]

export const StoryTellerSchema = z.object({
	imagesUrl: z.string({
		required_error: 'At least one imageId is required',
	}),
	// .uuid('Invalid imageId format. It should be a UUID'),
	theme: z.enum(arrayThemes, {
		required_error: 'A theme is required',
	}),
	description: z.string(),
})
