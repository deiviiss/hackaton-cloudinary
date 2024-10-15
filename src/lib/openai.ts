import OpenAI from 'openai'

import { HISTORY_THEMES } from '@/constants/global'
import { THEMA } from '@/types'

const clientOpenAI = new OpenAI({
	apiKey: process.env['OPENAI_API_KEY'],
})

export async function generateStory(content: string, theme: THEMA) {
	try {
		const response = await clientOpenAI.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content: HISTORY_THEMES[theme],
				},
				{ role: 'user', content },
			],
		})

		if (!response.choices[0].message.content) {
			return 'No se ha generado una respuesta desde OpenAI'
		}

		return response.choices[0].message.content
	} catch (error) {
		console.error(error)
		throw new Error(`Error generating text with OpenAI: ${error}`)
	}
}
