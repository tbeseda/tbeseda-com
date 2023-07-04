import arc from '@architect/functions'
import standardMiddleware from '../../middleware/common.mjs'

const { articles } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '😵', hCards = [] }) {
	const query = await articles.scan({})

	return {
		json: { icon, hCards, articles: query.Items },
	}
}

export const get = [...standardMiddleware, getHandler]
