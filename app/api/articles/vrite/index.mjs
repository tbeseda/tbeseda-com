import arc from '@architect/functions'
import standardMiddleware from '../../../middleware/common.mjs'

const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '😵', hCards = [] }) {
	const query = await things.query({
		IndexName: 'thingsByType',
		KeyConditionExpression: '#type = :type',
		ExpressionAttributeNames: {
			'#type': 'type',
		},
		ExpressionAttributeValues: {
			':type': 'vrite:content',
		},
	})

	return {
		json: { icon, hCards, articles: query.Items },
	}
}

export const get = [...standardMiddleware, getHandler]
