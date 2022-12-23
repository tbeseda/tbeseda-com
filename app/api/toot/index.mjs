import standardMiddleware from '../../middleware/standard.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler(req) {
	return {
		json: {
			// @ts-ignore
			icon: req.state.icon || '😵',
			// @ts-ignore
			hCards: req.state.hCards,
		},
	}
}

export const get = [...standardMiddleware, getHandler]
