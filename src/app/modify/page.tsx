/* eslint-disable @next/next/no-img-element */
'use client'

import { useImageStore } from '@/lib/store/images'

const Page = () => {
	const { updatedBgResult } = useImageStore()

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<img src={updatedBgResult} alt="image updated" className="w-1/2 h-auto" />
		</div>
	)
}

export default Page
