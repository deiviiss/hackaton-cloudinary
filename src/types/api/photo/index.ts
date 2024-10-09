import { THEMA } from '@/types/global/thema.enum'

interface FormInputData {
	image: File
	theme: THEMA
	description: string
}

interface FormOutputData {
	imageId: string
	url: string
	theme: THEMA
	description: string
}

export type { FormInputData, FormOutputData }
