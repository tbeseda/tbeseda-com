/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get () {
  return {
    status: 302,
    headers: { location: '/blog' },
  }
}
