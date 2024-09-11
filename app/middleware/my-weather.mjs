import arc from '@architect/functions'

const { things } = await arc.tables()

export default async function spotifyPlaying(_, data) {
  let myWeather
  try {
    const weatherQuery = await things.query({
      IndexName: 'thingsByType',
      KeyConditionExpression: '#type = :weather',
      ExpressionAttributeNames: { '#type': 'type' },
      ExpressionAttributeValues: { ':weather': 'weather' },
    })
    myWeather = weatherQuery.Items.find(({ key }) => key === 'tomorrow-io')
  } catch (error) {
    // nbd
  }

  data.myWeather = myWeather
}
