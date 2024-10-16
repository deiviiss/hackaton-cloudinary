/* eslint-disable @next/next/no-img-element */
'use client'

import { redirect } from 'next/navigation'

import Footer from '@/components/landing/Footer'
import { useImageStore } from '@/lib/store/images'

const Page = () => {
	const { imageUrl, updatedBgResult } = useImageStore()

	if (imageUrl === '') {
		redirect('/form')
	}

	return (
		<main className="bg-background min-h-screen w-full flex flex-col justify-center">
			<section className="flex w-full justify-center min-h-screen items-center">
				<div className="w-full flex flex-col sm:flex-row gap-x-5 justify-center items-start p-1">
					<div className="w-full sm:w-1/4">
						<span className="font-bold text-xl">Imagen original</span>
						<img
							src={imageUrl}
							alt="image placeholder"
							className="w-full h-auto mt-2 rounded-xl"
						/>
					</div>
					<div className="w-full sm:w-1/4 flex flex-col">
						<span className="font-bold text-xl">Imagen con tema</span>
						<img
							src={updatedBgResult}
							alt="image placeholder"
							className="w-full h-auto mt-2 rounded-xl"
						/>
						<div className="w-full place-items-center my-2 flex justify-center">
							<a
								href={updatedBgResult}
								target="_blank"
								download
								className="rounded-md bg-[#5b3165] px-2 py-1 w-fit text-xl"
							>
								Descargar imagen
							</a>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	)
}

export default Page
