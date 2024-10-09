import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	try {
		await prisma.user.deleteMany({})

		console.log('All records deleted.')

		// Crear nuevos registros users
		const userCreated = await prisma.user.create({
			data: {
				email: 'fasdfa@gmail.com',
				name: 'asdfasd',
			},
		})

		console.log('User created:', userCreated)
	} catch (err) {
		console.error('Error deleting records or creating users:', err)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
}

main()
