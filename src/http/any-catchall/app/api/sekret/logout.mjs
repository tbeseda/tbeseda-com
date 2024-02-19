/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get() {
  return {
    json: { authorized: false },
    session: {},
  }
}
