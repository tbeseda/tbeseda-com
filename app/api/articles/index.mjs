import articlesData from '../../lib/articles-data.mjs'
import standardMiddleware from '../../middleware/common.mjs'

const articles = articlesData.filter((a) => !a.hidden)

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '😵', hCards = [] }) {
	return {
		json: {
			icon: icon,
			hCards: hCards,
			articles,
		},
	}
}

export const get = [...standardMiddleware, getHandler]
