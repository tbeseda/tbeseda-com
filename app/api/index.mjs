import { getMostRecentArticle } from '../lib/sanity-client.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler() {
  const recentArticle = await getMostRecentArticle()

  return {
    json: { recentArticle },
  }
}

export const get = getHandler
