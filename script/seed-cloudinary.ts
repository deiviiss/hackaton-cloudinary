import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	try {
		await prisma.imageSocialType.deleteMany({})
		await prisma.socialPost.deleteMany({})
		await prisma.socialMedia.deleteMany({})
		await prisma.userImageResult.deleteMany({})
		await prisma.userImage.deleteMany({})
		await prisma.user.deleteMany({})

		console.log('All records deleted.')

		// Crear nuevos registros users
		const userCreated = await prisma.user.create({
			data: {
				email: 'user@gmail.com',
				name: 'user',
				password: 'user123',
			},
		})

		const userImageCreated = await prisma.userImage.create({
			data: {
				userId: userCreated.id,
				path: 'https://media.gq.com/photos/63e2b84fc3e6ea31f7c7dd30/16:9/w_2560%2Cc_limit/best-shoe-brands-nike-asics-celine.jpg',
			},
		})

		const userImageResultCreated = await prisma.userImageResult.create({
			data: {
				userImageId: userImageCreated.id,
				path: 'https://thumbs.dreamstime.com/z/flaming-running-shoes-pumpkins-dark-background-halloween-concept-generative-ai-animal-ai-flaming-running-shoes-pumpkins-286823361.jpg?ct=jpeg',
				prompt: 'Un part de zapatillas en llamas para halloween',
			},
		})

		const socialMediaCreated = await prisma.socialMedia.create({
			data: {
				name: 'Tiktok',
			},
		})

		await prisma.socialPost.create({
			data: {
				userImageResultId: userImageResultCreated.id,
				descriptionPromt:
					'Un par de zapatillas en llamas para halloween con calabazas y fuego en el fondo',
				descriptionResult:
					'Disfruta de un part de zapatillas en llamas para halloween con calabazas y fuego en el fondo',
				socialMediaId: socialMediaCreated.id,
			},
		})

		await prisma.imageSocialType.create({
			data: {
				format: 'jpg',
				height: 1920,
				width: 1080,
				socialMediaId: socialMediaCreated.id,
			},
		})

		await prisma.userImage.create({
			data: {
				userId: userCreated.id,
				path: 'https://res.cloudinary.com/dlixnwuhi/image/upload/v1728661439/f7lp7fyqr6motwuwigdq.jpg',
				userImageResults: {
					create: {
						path: 'https://res.cloudinary.com/generative-ai-demos/image/upload/e_gen_background_replace:prompt_fondo%20modo%20halloween%20con%20zoombies/f_auto/q_auto/bgr/y2uit8dudkxipu4c5i32.jpg',
						prompt: 'Fondo modo halloween con zoombies',
					},
				},
			},
		})

		await prisma.userImage.create({
			data: {
				userId: userCreated.id,
				path: 'https://res.cloudinary.com/dlixnwuhi/image/upload/v1728660789/ox6bzzdwexyqbzakyp2y.jpg',
				userImageResults: {
					create: {
						path: 'https://res.cloudinary.com/generative-ai-demos/image/upload/e_gen_background_replace:prompt_Una%20casa%20con%20dise%C3%B1o%20halloween%20con%20calaveras%20draculas%20fantasmas%20brujas%20y%20mas/f_auto/q_auto/bgr/s2ihhnon50qxgerttzwi.jpg',
						prompt:
							'Una casa con diseño halloween con calaveras draculas fantasmas brujas y mass',
					},
				},
			},
		})

		console.log('Seeded successfully')
	} catch (err) {
		console.error('Error deleting records or creating users:', err)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
}

main()
