import { THEMA } from '@/types/global/thema.enum'

interface FormInputData {
	image: File[]
	theme: THEMA
	description: string
}

interface FormOutputData {
	imageId: string
	url: string
	theme: THEMA
	description: string
}

// Define the type for social media platforms
type SocialMedia = 'instagram' | 'facebook' | 'tiktok' | 'x' | 'default'

export type { FormInputData, FormOutputData, SocialMedia }
