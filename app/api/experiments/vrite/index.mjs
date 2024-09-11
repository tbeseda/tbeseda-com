import arc from '@architect/functions'

const typeString = 'vrite:content'
const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async () => {
  const { Items: contentPieces } = await things.query({
    IndexName: 'thingsByType',
    KeyConditionExpression: '#type = :type',
    ExpressionAttributeNames: {
      '#type': 'type',
    },
    ExpressionAttributeValues: {
      ':type': typeString,
    },
  })

  const published = contentPieces.filter((item) => item.key.startsWith(`${typeString}:Published:`))
  const drafts = contentPieces.filter((item) => item.key.startsWith(`${typeString}:Drafts:`))
  const ideas = contentPieces.filter((item) => item.key.startsWith(`${typeString}:Ideas:`))

  return {
    json: { published, drafts, ideas },
  }
}
