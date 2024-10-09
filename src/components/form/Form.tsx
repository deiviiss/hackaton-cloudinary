'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const themes = [
	{
		value: 'halloween',
		label: 'Halloween',
	},
	{
		value: 'navidad',
		label: 'Navidad',
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
	const [selectedImages, setSelectedImages] = useState<File[]>([])
	const [open, setOpen] = useState(false)
	const [themeSelected, setThemeSelected] = useState('')
	const [imageError, setImageError] = useState<string | null>(null)

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files)

			if (filesArray.length + selectedImages.length > 3) {
				setImageError('Solo puedes seleccionar 3 imágenes')
				return
			}

			setSelectedImages((prevImages) => prevImages.concat(filesArray))
		}
	}

	const handleRemoveImage = (index: number) => {
		setSelectedImages((prevImages) =>
			prevImages.filter((_, imgIndex) => imgIndex !== index),
		)
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			images: null,
			description: '',
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
		console.log('selected image', selectedImages)
		console.log('theme', themeSelected)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/3">
				{/* DROPZONE */}
				{selectedImages.length > 0 ? (
					<div className="grid grid-cols-3 gap-4">
						{selectedImages.map((image, index) => (
							<div key={index} className="relative">
								<img
									src={URL.createObjectURL(image)}
									alt={`upload-preview-${index}`}
									className="h-48 w-full object-cover rounded-lg"
								/>
								<button
									onClick={() => handleRemoveImage(index)}
									className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
								>
									&times;
								</button>
							</div>
						))}
					</div>
				) : (
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<>
										<div className="image-dropzone">
											<FormLabel
												htmlFor="file-upload"
												className="text-xl py-7 text-neutral-300"
											>
												Sube o arrastra tu imagen
											</FormLabel>

											<Input
												type="file"
												id="file-upload"
												className="hidden"
												accept="image/*"
												multiple
												onChange={(event) => {
													handleImageChange(event)
													field.onChange(event)
												}}
											/>
										</div>
										{imageError && (
											<p className="text-red-500 text-sm mt-2 text-center">
												{imageError}
											</p>
										)}
									</>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				{/* THEME */}
				<section className="w-full flex gap-x-3 items-center justify-center">
					<div className="flex-1 text-center">
						<span>Selecciona un tema</span>
					</div>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={open}
								className="w-full flex-1 justify-between"
							>
								{themeSelected
									? themes.find((theme) => theme.value === themeSelected)?.label
									: 'Selecciona una tematica'}
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
														currentValue === themeSelected ? '' : currentValue,
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

				{/* DESCRIPTION */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder="Descripción..."
									className="resize-none border border-neutral-500 outline-none ring-0"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<button
					type="submit"
					className={cn('default-button', {
						'halloween-button': themeSelected === 'halloween',
						'navidad-button': themeSelected === 'navidad',
					})}
				>
					Generar imagen
				</button>
			</form>
		</Form>
	)
}

export default MainForm
