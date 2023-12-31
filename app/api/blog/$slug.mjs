import arc from '@architect/functions'

const { articles } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async function ({ store: { timers }, params: { slug } }) {
  timers.start('dynamo', 'tb-article-query')
  const query = await articles.query({
    IndexName: 'articlesBySlug',
    KeyConditionExpression: 'slug = :slug',
    ExpressionAttributeValues: { ':slug': slug },
  })
  const queryTime = timers.stop('dynamo')

  timers.stop('total')
  return {
    headers: { ...timers.toObject() },
    json: {
      article: query.Items[0],
      queryTime,
    },
  }
}
