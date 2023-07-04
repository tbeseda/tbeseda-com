import standardMiddleware from '../middleware/common.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '😵', hCards = [] }) {
	console.log('GET /')
	return {
		json: { icon, hCards },
	}
}

export const get = [...standardMiddleware, getHandler]
