import arc from '@architect/functions'
import standardMiddleware from '../../../middleware/common.mjs'

const { things } = await arc.tables()
const typeString = 'vrite:content'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler ({
  icon = '⛔️',
  hCards = [],
  currentlyPlaying,
  params,
}) {
  const { id } = params

  // assumes published group
  const content = await things.get({ key: `${typeString}:Published:${id}` })

  return {
    json: { icon, hCards, currentlyPlaying, content },
  }
}

export const get = [...standardMiddleware, getHandler]
