import { urlsafeDecode } from './urlsafe-encode.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
  const {
    params: { blob },
  } = req
  return { json: { string: urlsafeDecode(blob) } }
}
