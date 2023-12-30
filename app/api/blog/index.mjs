import arc from '@architect/functions'

const { articles } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async function ({ timers }) {
  timers.start('dynamo', 'tb-articles-query')
  // TODO: not scan
  const query = await articles.scan({
    Limit: 100,
    FilterExpression: 'attribute_exists(published)',
    ProjectionExpression: 'title, published, slug, description, #date',
    ExpressionAttributeNames: {
      '#date': 'date',
    },
  })
  timers.stop('dynamo')

  const sortedArticles = query.Items.filter(({ published }) => published).sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf(),
  )

  timers.stop('total')
  return {
    headers: { ...timers.toObject() },
    json: { articles: sortedArticles },
  }
}
