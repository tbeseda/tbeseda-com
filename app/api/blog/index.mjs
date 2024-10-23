import { getRecentPublishedArticles } from '../../lib/sanity-client.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async ({ timers }) => {
  timers.start('articles-query', 'tb-articles-query')
  const articles = await getRecentPublishedArticles()
  timers.stop('articles-query')

  timers.stop('total')
  return {
    headers: { ...timers.object() },
    json: { articles },
  }
}
