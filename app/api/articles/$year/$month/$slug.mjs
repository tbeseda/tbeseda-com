import standardMiddleware from '../../../../middleware/common.mjs'
import { articleFromPath } from '../../../../lib/articles-data.mjs'
import { mentionsByPath } from '../../../../lib/webmentions-data.mjs'

// /** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ params, icon = '😵', hCards = [] }) {
	const { proxy } = params
	const path = `/${proxy}`
	const article = articleFromPath(path)
	const mentions = await mentionsByPath(article?.path)

	return {
		json: {
			icon,
			hCards,
			article,
			mentions,
		},
	}
}

export const get = [...standardMiddleware, getHandler]
