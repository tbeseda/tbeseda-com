import arc from '@architect/functions'
import standardMiddleware from '../../middleware/common.mjs'

const { articles } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler ({
  timers,
  icon = '⛔️',
  hCards = [],
  currentlyPlaying,
  params,
}) {
  const { slug } = params
  timers.start('dynamo', 'tb-article-query')
  const query = await articles.query({
    IndexName: 'articlesBySlug',
    KeyConditionExpression: 'slug = :slug',
    ExpressionAttributeValues: {
      ':slug': slug,
    },
  })
  const queryTime = timers.stop('dynamo')

  timers.stop('total')
  return {
    headers: { ...timers.toObject() },
    json: {
      icon,
      hCards,
      currentlyPlaying,
      article: query.Items[0],
      queryTime,
    },
  }
}

export const get = [...standardMiddleware, getHandler]
