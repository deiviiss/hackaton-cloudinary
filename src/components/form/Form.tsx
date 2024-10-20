/* eslint-disable @next/next/no-img-element */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { uploadPhoto } from '@/app/actions/photos/upload-photo'
import { errorToast, successToast } from '@/components/Toasts'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { useImageStore } from '@/lib/store/images'
import { cn } from '@/lib/utils'

import Facebook from '../icons/Facebook'
import Instagram from '../icons/Instalgram'
import TikTok from '../icons/TikTok'
import Twitter from '../icons/Twitter'
import Footer from '../landing/Footer'

const themes = [
  {
    value: 'halloween',
    label: 'Halloween',
  },
  {
    value: 'christmas',
    label: 'Navidad',
  },
]

const socialButtons = [
  {
    social: 'facebook',
    Icon: Facebook,
  },
  {
    social: 'instagram',
    Icon: Instagram,
  },
  {
    social: 'tikTok',
    Icon: TikTok,
  },
  {
    social: 'x',
    Icon: Twitter,
  },
]

const formSchema = z.object({
  images: z.any(),
  description: z
    .string()
    .min(2, {
      message: 'La descripción es muy corta',
    })
    .optional(),
})

function MainForm() {
  const [open, setOpen] = useState(false)
  const [themeSelected, setThemeSelected] = useState('')
  const [imageError, setImageError] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [socialMediaCheck, setSocialMediaCheck] = useState(false)
  const [socialSelected, setSocialSelected] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const setData = useImageStore((state) => state.setData)

  const onDrop = (acceptedFiles: any) => {
    if (acceptedFiles[0].size >= 10000000) {
      setImageError(
        `Máximo 10 MB, tu archivo pesa ${(acceptedFiles[0].size / 1_000_000).toFixed(1)}`,
      )
      errorToast(
        `Máximo 10 MB, tu archivo pesa ${(acceptedFiles[0].size / 1_000_000).toFixed(1)}`,
      )
      return
    }
    if (acceptedFiles.length > 1) {
      setImageError('Solo puedes seleccionar 1 imagen')
      errorToast('Solo puedes seleccionar 1 imagen')
      return
    } else {
      setFiles(acceptedFiles)
      setImageError('')
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    multiple: true,
  })

  const removeFile = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    )
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  })

  const handleSMCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setSocialMediaCheck(e.target.checked)
    if (!e.target.checked) {
      setSocialSelected('')
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (files.length === 0) {
      errorToast('Por favor selecciona al menos una imagen')
    } else if (themeSelected === '') {
      errorToast('Por favor selecciona una tematica')
    } else {
      const formData = new FormData()
      const firstImage = files[0]

      formData.append('theme', themeSelected)
      formData.append('description', values.description ?? '')
      //! current api only accepts one image
      formData.append('image', firstImage)
      formData.append('social_media', socialSelected)
      // files.forEach((file, index) => {
      //   formData.append(`imagen-${index}`, file)
      // })

      // formData.forEach((value, key) => {
      // 	console.log(key + ':', value)
      // })

      setIsLoading(true)
      const { ok, data } = await uploadPhoto(formData)

      if (!ok || !data) {
        errorToast('Error al subir las imágenes')
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setData(data)
        successToast('Imagen subida')
        router.push('/result')
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <section className="w-full min-h-screen flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full sm:w-1/2 lg:w-2/4 p-2 sm:p-4 bg-[#2a1b32] m-1 md:m-0 rounded-md"
          >
            {/* DROPZONE */}
            {files.length > 0 ? (
              <section className="grid grid-cols-1 place-items-center gap-1">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="text-sm text-neutral-500 relative shadow"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`upload-preview-${index}`}
                      className="h-48 w-full object-cover rounded-lg shadow-md shadow-black"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="bg-red-500 text-white rounded-full absolute top-1 right-1 px-2 py-1 hover:scale-110"
                    >
                      &#10005;
                    </button>
                  </div>
                ))}
              </section>
            ) : (
              <div {...getRootProps()} className="image-dropzone">
                <input {...getInputProps()} className="hidden" />
                <FormLabel
                  htmlFor="file-upload"
                  className="py-7 text-neutral-300 flex flex-col gap-y-2 text-center"
                >
                  <span className="text-xl">Sube o arrastra tu imagen</span>
                  <span className="text-sm">Max. 1 imagen</span>
                </FormLabel>
              </div>
            )}
            {imageError && (
              <span className="text-red-500 text-center">{imageError}</span>
            )}

            {/* THEME */}
            <section className="w-full flex gap-x-3 items-center justify-center">
              <div className="flex-1">
                <span>Elige una temática para tu imagen</span>
              </div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-1/3 justify-between"
                  >
                    {themeSelected
                      ? themes.find((theme) => theme.value === themeSelected)
                        ?.label
                      : 'Temáticas'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {themes.map((theme) => (
                          <CommandItem
                            key={theme.value}
                            value={theme.value}
                            onSelect={(currentValue) => {
                              setThemeSelected(
                                currentValue === themeSelected
                                  ? ''
                                  : currentValue,
                              )
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                themeSelected === theme.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {theme.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </section>

            {/* SOCIAL MEDIA */}
            <div className="flex items-center justify-center space-x-2">
              <input
                id="social_media"
                type="checkbox"
                className={cn({
                  'accent-orange-500': themeSelected == 'halloween',
                  'accent-green-500': themeSelected == 'christmas',
                })}
                onChange={handleSMCheck}
                checked={socialMediaCheck}
              />
              <label
                htmlFor="social_media"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Contenido para redes sociales
              </label>
            </div>

            {socialMediaCheck && (
              <div className="flex items-center justify-around gap-x-2">
                {socialButtons.map(({ social, Icon }, index) => (
                  <button
                    key={index}
                    type="button"
                    title={social}
                    onClick={() => {
                      setSocialSelected(social)
                    }}
                    className={cn('hover:bg-[#180e21] p-2 rounded-md', {
                      'bg-[#180e21] border': socialSelected === social,
                      'border-orange-500': themeSelected === 'halloween',
                      'border-green-500': themeSelected === 'christmas',
                    })}
                  >
                    <Icon className="size-8" />
                  </button>
                ))}
              </div>
            )}

            {/* DESCRIPTION */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="20% de descuento, 2X1, producto gratis..."
                      className={cn(
                        'resize-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none',
                        {
                          'border border-orange-500':
                            themeSelected === 'halloween',
                          'border border-green-500':
                            themeSelected === 'christmas',
                        },
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              disabled={isLoading}
              className={cn('default-button', {
                'halloween-button': themeSelected === 'halloween',
                'navidad-button': themeSelected === 'christmas',
              })}
            >
              {isLoading ? 'Cargando...' : 'Generar imagen'}
            </button>
          </form>
        </Form>
      </section>

      <Footer />
    </div>
  )
}

export default MainForm
