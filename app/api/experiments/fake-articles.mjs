import arc from '@architect/functions'
import { createID } from '../../lib/create-id.mjs'
import standardMiddleware from '../../middleware/common.mjs'

const { 'experiment-articles': articles } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler ({ icon = '⛔️', hCards = [], currentlyPlaying }) {
  const query = await articles.scan({})

  return {
    json: { icon, hCards, currentlyPlaying, articles: query.Items },
  }
}

export const get = [...standardMiddleware, getHandler]

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function post ({ body }) {
  const { content, date, description, published, slug, title } = body
  const article = {
    articleID: createID(),
    doc: JSON.parse(content),
    date,
    description,
    published: !!published,
    slug,
    title,
    ttl: Math.floor(Date.now() / 1000) + 60 * 15,
  }

  await articles.put(article)

  return {
    status: 302,
    headers: { location: '/experiments/fake-articles' },
  }
}
