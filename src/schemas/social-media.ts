import { z } from 'zod'

import { SocialMedia } from '@/types/api/photo'

const arrraySocialMedia = [
	'instagram',
	'facebook',
	'tiktok',
	'x',
	'default',
] as [SocialMedia, ...SocialMedia[]]

export const SocialMediaSchema = z.object({
	imageUrl: z.string({
		required_error: 'A imageUrl is required',
	}),
	socialMedia: z.enum(arrraySocialMedia, {
		required_error: 'A social media is required',
	}),
})
