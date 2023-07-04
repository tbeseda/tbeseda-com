import arc from '@architect/functions'
import standardMiddleware from '../middleware/common.mjs'

const { articles } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '😵', hCards = [] }) {
	const query = await articles.scan({
		FilterExpression: 'attribute_exists(published)',
		Limit: 1,
	})
	const recentArticle = query.Items[0]
	delete recentArticle.doc

	return {
		json: { icon, hCards, recentArticle },
	}
}

export const get = [...standardMiddleware, getHandler]
