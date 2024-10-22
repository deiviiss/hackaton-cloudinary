/* eslint-disable @next/next/no-img-element */
'use client'

import { Download, Link, Share } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'

import { ButtonBack } from '@/components/ButtonBack'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useImageStore } from '@/lib/store/images'
import { cn } from '@/lib/utils'

const ResultPage = () => {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const { imageUrl, updatedBgResult } = useImageStore()
  const router = useRouter()

  if (imageUrl === '') {
    redirect('/form')
  }

  const handleImageLoad = () => {
    setIsImageLoading(false)
  }

  async function downloadImage(imageSrc: string) {
    let urlImageToDownload = imageSrc

    const image = await fetch(urlImageToDownload)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = `picture-${crypto.randomUUID()}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="bg-background w-full max-w-3xl h-full flex flex-col justify-center items-center mx-auto">
      <div className='w-full flex justify-end'>
        <ButtonBack name='Nueva imagen' className='gap-1 mx-5 my-3' />
      </div>
      <section className="mt-10 px-5">
        <div className="grid sm:grid-cols-[1fr,auto,1fr] justify-items-center gap-10 mb-24">
          <figcaption>
            <span className="inline-block mb-4 text-4xl font-semibold">
              Imagen original
            </span>
            <img src={imageUrl} alt="original" className="rounded" />
          </figcaption>

          <div className="relative border border-white h-full flex-1">
            <div className="h-full w-1 bg-white absolute top-0 left-1/2 -translate-x-1/2"></div>
          </div>

          <figcaption>
            <span className="inline-block mb-4 text-4xl font-semibold">
              Imagen creada
            </span>
            <img
              src={updatedBgResult}
              onLoad={handleImageLoad}
              onError={() => setIsImageLoading(false)}
              alt="updated"
              className={cn('rounded', isImageLoading && 'opacity-0 absolute')}
            />
            {isImageLoading ? (
              <div className="relative">
                <img
                  src={imageUrl}
                  alt="original"
                  className="rounded opacity-0 invisible"
                />
                <Skeleton className="size-full absolute top-0 left-0" />
              </div>
            ) : (
              <>
                <div className="mt-2 flex items-center sm:justify-between justify-end gap-5">
                  <Button
                    className="items-center gap-2"
                    size={'lg'}
                    onClick={() => {
                      navigator.share({
                        title: 'Compartir imagen',
                        text: 'Compartir de forma sencilla',
                        url: updatedBgResult,
                      })
                    }}
                  >
                    <Share className='size-4' />
                    Compartir
                  </Button>

                  <Button
                    size="lg"
                    className="items-center gap-2"
                    onClick={() => downloadImage(updatedBgResult)}
                  >
                    <Download className="size-4" />
                    Download
                  </Button>
                </div>
              </>
            )}
          </figcaption>
        </div>
      </section>
    </main>
  )
}

export default ResultPage
