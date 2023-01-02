import standardMiddleware from '../../../../middleware/common.mjs'
import { articleFromPath } from '../../../../lib/articles-data.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ params, state }) {
	const { proxy } = params
	const path = `/${proxy}`
	const article = articleFromPath(path)

	const cacheControl = process.env.ARC_SANDBOX
		? 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
		: 'max-age=3600;'

	return {
		cacheControl,
		json: {
			icon: state.icon || '😵',
			hCards: state.hCards,
			article,
		},
	}
}

export const get = [...standardMiddleware, getHandler]
