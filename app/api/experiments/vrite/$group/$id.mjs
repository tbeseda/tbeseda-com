import arc from '@architect/functions'

const { things } = await arc.tables()
const typeString = 'vrite:content'

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async function ({ params }) {
  const { group, id } = params

  const content = await things.get({ key: `${typeString}:${group}:${id}` })

  return {
    json: { content },
  }
}
