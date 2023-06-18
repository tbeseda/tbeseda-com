import arc from '@architect/functions'
import standardMiddleware from '../../../middleware/common.mjs'

const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '😵', hCards = [] }) {
	const { Items: contentPieces } = await things.query({
		IndexName: 'thingsByType',
		KeyConditionExpression: '#type = :type',
		ExpressionAttributeNames: {
			'#type': 'type',
		},
		ExpressionAttributeValues: {
			':type': 'vrite:content',
		},
	})

	const published = contentPieces.filter((item) =>
		item.key.startsWith('content:Published:'),
	)
	const drafts = contentPieces.filter((item) =>
		item.key.startsWith('content:Drafts:'),
	)

	return {
		json: { icon, hCards, published, drafts },
	}
}

export const get = [...standardMiddleware, getHandler]
