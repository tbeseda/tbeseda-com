import arc from '@architect/functions'

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get({ session }) {
  let { admin } = session
  admin = !!admin

  if (!admin) throw new Error('Unauthorized')

  const { articles } = await arc.tables()

  // TODO: not scan
  const articleQuery = await articles.scan({
    Limit: 100,
    ProjectionExpression: 'articleID, title, published, doc, description, #date',
    ExpressionAttributeNames: {
      '#date': 'date',
    },
  })

  const sortedArticles = articleQuery.Items.sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf(),
  )

  return {
    json: { admin, articles: sortedArticles },
  }
}
