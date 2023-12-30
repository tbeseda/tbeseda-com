/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async function ({ requestContext }) {
  const userIp = requestContext.http.sourceIp || '127.0.0.1'
  return { json: { userIp } }
}
