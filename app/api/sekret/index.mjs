/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get({ session }) {
  let { admin } = session
  admin = !!admin

  return {
    json: { admin },
    session,
  }
}
