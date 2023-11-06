import arc from '@architect/functions'
import standardMiddleware from '../../middleware/common.mjs'

const { articles } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler ({ timers, icon = '⛔️', hCards = [], currentlyPlaying }) {
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
    json: { icon, hCards, currentlyPlaying, articles: sortedArticles },
  }
}

export const get = [...standardMiddleware, getHandler]
