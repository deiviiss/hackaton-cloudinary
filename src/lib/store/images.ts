import { create } from 'zustand'

import { type IImagesStore } from '@/types/store/images'

const initialState = {
	imageId: '',
	imageUrl: '',
	theme: '',
	description: '',
	updatedBgResult: '',
}

export const useImageStore = create<IImagesStore>((set) => ({
	...initialState,
	setData(data) {
		set((state) => ({
			...state,
			...data,
		}))
	},
}))
