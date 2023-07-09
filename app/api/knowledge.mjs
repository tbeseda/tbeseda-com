import standardMiddleware from '../middleware/common.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '⛔️', hCards = [], currentlyPlaying }) {
	return {
		json: { icon, hCards, currentlyPlaying },
	}
}

export const get = [...standardMiddleware, getHandler]
