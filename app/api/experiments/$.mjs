import standardMiddleware from '../../middleware/common.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ requestContext, icon = '😵', hCards = [] }) {
	const userIp = requestContext.http.sourceIp || '127.0.0.1'
	return { json: { userIp, icon, hCards } }
}

export const get = [...standardMiddleware, getHandler]
