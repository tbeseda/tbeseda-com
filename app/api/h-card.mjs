import randomIconMiddleWare from '../middleware/random-icon.mjs'
import addHCards from '../middleware/add-h-cards.mjs'

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

export const get = [addHCards, randomIconMiddleWare, getHandler]
