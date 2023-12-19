import arc from '@architect/functions'
import standardMiddleware from '../../middleware/common.mjs'

const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler () {
  const weatherQuery = await things.query({
    IndexName: 'thingsByType',
    KeyConditionExpression: '#type = :weather',
    ExpressionAttributeNames: { '#type': 'type' },
    ExpressionAttributeValues: { ':weather': 'weather' },
  })
  const haveData = weatherQuery.Items?.length > 0

  return {
    status: haveData ? 200 : 500,
    json: haveData
      ? { weather: weatherQuery.Items }
      : { error: 'No weather data found' },
  }
}

export const get = [...standardMiddleware, getHandler]
