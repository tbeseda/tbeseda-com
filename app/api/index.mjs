import arc from '@architect/functions'

const { articles } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler () {
  console.log('API 📡')
  // TODO: not scan
  const query = await articles.scan({
    Limit: 10,
    FilterExpression: 'attribute_exists(published)',
    ProjectionExpression: 'title, published, slug, description, #date',
    ExpressionAttributeNames: {
      '#date': 'date',
    },
  })

  const sortedArticles = query.Items.filter(({ published }) => published).sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf(),
  )

  return {
    json: { recentArticle: sortedArticles[0] },
  }
}

export const get = getHandler
