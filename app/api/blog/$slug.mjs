import { getArticleBySlug } from '../../lib/sanity-client.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async ({ timers, params: { slug } }) => {
  timers.start('article-query', 'tb-article-query')
  const article = await getArticleBySlug(slug)
  const queryTime = timers.stop('article-query')

  timers.stop('total')
  return {
    headers: { ...timers.object() },
    json: {
      article,
      queryTime,
      timers,
    },
  }
}
