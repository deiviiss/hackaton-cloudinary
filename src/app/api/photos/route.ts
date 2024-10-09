import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	try {
		// toda la logica de tu endpoint
		return { status: 200, message: 'ok' }
	} catch (error) {
		console.error(error)
		return { error: `${error}` }
	}
}
