import arc from '@architect/functions'
import standardMiddleware from '../../../middleware/common.mjs'

const typeString = 'vrite:content'
const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler ({ icon = '⛔️', hCards = [], currentlyPlaying }) {
  const { Items: contentPieces } = await things.query({
    IndexName: 'thingsByType',
    KeyConditionExpression: '#type = :type',
    ExpressionAttributeNames: {
      '#type': 'type'
    },
    ExpressionAttributeValues: {
      ':type': typeString
    }
  })

  const published = contentPieces.filter((item) =>
    item.key.startsWith(`${typeString}:Published:`)
  )
  const drafts = contentPieces.filter((item) =>
    item.key.startsWith(`${typeString}:Drafts:`)
  )
  const ideas = contentPieces.filter((item) =>
    item.key.startsWith(`${typeString}:Ideas:`)
  )

  return {
    json: { icon, hCards, currentlyPlaying, published, drafts, ideas }
  }
}

export const get = [...standardMiddleware, getHandler]
