import arc from '@architect/functions'
import { createID } from '../../../lib/create-id.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get({ query, session }) {
  let { admin } = session
  admin = !!admin

  if (!admin) throw new Error('Unauthorized')

  const { articles } = await arc.tables()
  const { articleID } = query
  let article
  if (articleID) article = await articles.get({ articleID })

  return {
    json: { admin, article },
  }
}

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function post({ body, session }) {
  let { admin } = session
  admin = !!admin

  if (!admin) throw new Error('Unauthorized')

  const { articles } = await arc.tables()
  const { action, articleID, content, date, description, published, slug, title } = body

  if (action === 'destroy') {
    await articles.delete({ articleID })
  } else {
    const article = {
      updatedAt: new Date().toISOString(),
      articleID: articleID || createID(),
      doc: JSON.parse(content),
      date,
      description,
      published: !!published,
      slug,
      title,
    }

    await articles.put(article)
  }

  return {
    status: 302,
    headers: { location: '/sekret/blog' },
  }
}
