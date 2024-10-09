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
				email: 'fasdfa@gmail.com',
				name: 'asdfasd',
				password: 'asdfasdf',
			},
		})

		const userImageCreated = await prisma.userImage.create({
			data: {
				path: 'https://media.gq.com/photos/63e2b84fc3e6ea31f7c7dd30/16:9/w_2560%2Cc_limit/best-shoe-brands-nike-asics-celine.jpg',
			},
		})

		const userImageResultCreated = await prisma.userImageResult.create({
			data: {
				userImageId: userImageCreated.id,
				path: 'https://thumbs.dreamstime.com/z/flaming-running-shoes-pumpkins-dark-background-halloween-concept-generative-ai-animal-ai-flaming-running-shoes-pumpkins-286823361.jpg?ct=jpeg',
				prompt: 'A pair of shoes that are on fire',
			
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
				descriptionPromt: 'A pair of shoes that are on fire for halloween',
				descriptionResult: 'A pair of shoes that are on fire for halloween with pumpkins',
				socialMediaId: socialMediaCreated.id,
			},
		})

		await prisma.imageSocialType.create({
			data: {
				format: 'jpg',
				height: 100,
				width: 100,
				socialMediaId: socialMediaCreated.id,
			},
		})
		
	} catch (err) {
		console.error('Error deleting records or creating users:', err)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
}

main()
