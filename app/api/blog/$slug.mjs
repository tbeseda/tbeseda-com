import arc from '@architect/functions'
import standardMiddleware from '../../middleware/common.mjs'

const { articles } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '😵', hCards = [], params }) {
	const { slug } = params
	const query = await articles.query({
		IndexName: 'articlesBySlug',
		KeyConditionExpression: 'slug = :slug',
		ExpressionAttributeValues: {
			':slug': slug,
		},
	})

	return {
		json: { icon, hCards, article: query.Items[0] },
	}
}

export const get = [...standardMiddleware, getHandler]
