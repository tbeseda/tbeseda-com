import arc from '@architect/functions'
import { createClient } from '@vrite/sdk/api'

const { VRITE_KEY } = process.env
const { things } = await arc.tables()

export async function handler({ body }) {
	const json = JSON.parse(body)
	const { id } = json

	console.log(`Incoming content id: ${id}`)

	if (!VRITE_KEY) throw new Error('Missing Vrite key')
	const vrite = createClient({ token: VRITE_KEY })

	const contentPiece = await vrite.contentPieces.get({
		id: '[CONTENT_PIECE_ID]',
		content: true,
	})

	await things.put({
		key: `vrite:content:${contentPiece.id}`,
		updatedAt: new Date().toISOString(),
		...contentPiece,
	})

	return {
		statusCode: 200,
		body: 'tyvm',
	}
}
