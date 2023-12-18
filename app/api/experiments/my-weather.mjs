import arc from '@architect/functions'
const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get () {
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
      ? { data: weatherQuery.Items }
      : { error: 'No weather data found' },
  }
}
