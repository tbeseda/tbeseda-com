import arc from '@architect/functions'
import HeaderTimers from 'header-timers'
import standardMiddleware from '../../middleware/common.mjs'

const { articles } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler ({ icon = '⛔️', hCards = [], currentlyPlaying }) {
  const timers = HeaderTimers()

  timers.start('dynamo', 'get articles')
  // TODO: not scan
  const query = await articles.scan({
    Limit: 100,
    FilterExpression: 'attribute_exists(published)',
    ProjectionExpression: 'title, published, slug, description, #date',
    ExpressionAttributeNames: {
      '#date': 'date'
    }
  })
  timers.stop('dynamo')

  timers.start('sort', 'articles sort')
  const sortedArticles = query.Items.filter(({ published }) => published).sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
  )
  timers.stop('sort')

  return {
    headers: {
      [timers.headerKey]: timers.headerValue()
    },
    json: { icon, hCards, currentlyPlaying, articles: sortedArticles }
  }
}

export const get = [...standardMiddleware, getHandler]
