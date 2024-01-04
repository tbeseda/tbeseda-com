import arc from '@architect/functions'

const { things } = await arc.tables()
const typeString = 'vrite:content'

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async function ({ params }) {
  const { id } = params

  // assumes published group
  const content = await things.get({ key: `${typeString}:Published:${id}` })

  return {
    json: { content },
  }
}
