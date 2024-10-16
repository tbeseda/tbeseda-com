import { urlsafeEncode } from './urlsafe-encode.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function post(req) {
  const {
    body: { string },
  } = req

  let str
  try {
    str = JSON.stringify(JSON.parse(string))
  } catch (err) {
    str = string
  }

  const blob = urlsafeEncode(str)

  return {
    status: 302,
    headers: {
      location: `/experiments/encoded-url/${blob}`,
    },
  }
}
