/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	const userIp = req.requestContext.http.sourceIp || '127.0.0.1'
	return { json: { userIp } }
}
