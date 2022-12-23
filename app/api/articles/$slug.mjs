import standardMiddleware from '../../middleware/standard.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler(req) {
	const {
		params: { slug },
	} = req

	return {
		json: {
			// @ts-ignore
			icon: req.state.icon || '😵',
			// @ts-ignore
			hCards: req.state.hCards,
			article: {
				slug,
				title: 'Hello World',
				content: 'This is a test article',
				published: new Date(),
				edited: new Date(),
			},
		},
	}
}

export const get = [...standardMiddleware, getHandler]
