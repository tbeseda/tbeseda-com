import arc from '@architect/functions'
import { createClient } from '@vrite/sdk/api'

const PUBLISHED_GROUP_ID = '648a4065a2da16eedd81ef9c'
const { VRITE_KEY } = process.env
const { things } = await arc.tables()

export async function handler({ body }) {
	const json = JSON.parse(body)
	const { id } = json

	console.log(`Incoming content id: ${id}`)

	if (!VRITE_KEY) throw new Error('Missing Vrite key')
	const vrite = createClient({ token: VRITE_KEY })

	let contentPiece
	try {
		contentPiece = await vrite.contentPieces.get({ id, content: true })
	} catch (error) {
		console.log('Error fetching content piece', JSON.stringify(error, null, 2))
	}

	if (contentPiece) {
		if (contentPiece.contentGroupId === PUBLISHED_GROUP_ID) {
			const newContent = Object.keys(contentPiece).reduce((acc, key) => {
				const value = contentPiece[key]
				if (value) acc[key] = value
				return acc
			}, {})

			try {
				await things.put({
					key: `vrite:content:${id}`,
					type: 'vrite:content',
					updatedAt: new Date().toISOString(),
					...newContent,
				})
			} catch (err) {
				console.log(
					'Error saving content to db',
					JSON.stringify(newContent, null, 2),
					JSON.stringify(err, null, 2),
				)
			}
		} else {
			console.log('Content is not in Published group, deleting...')
			try {
				await things.delete({ key: `vrite:content:${id}` })
			} catch (error) {
				console.log('Error deleting content', JSON.stringify(error, null, 2))
			}
		}
	} else {
		console.log('No content piece found', JSON.stringify(contentPiece, null, 2))
	}

	return {
		statusCode: 200,
		body: 'tyvm',
	}
}
