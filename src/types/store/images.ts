type ImageData = {
	imageId: string
	imageUrl: string
	theme: string
	description: string
	updatedBgResult: string
}

export interface IImagesStore extends ImageData {
	setData: (data: ImageData) => void
}
