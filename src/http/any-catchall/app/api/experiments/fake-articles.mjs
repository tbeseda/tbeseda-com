import arc from '@architect/functions'
import { createID } from '../../lib/create-id.mjs'

const { 'experiment-articles': articles } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async function () {
  const query = await articles.scan({})

  return {
    json: { articles: query.Items },
  }
}

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
