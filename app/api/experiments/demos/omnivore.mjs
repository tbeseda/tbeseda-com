import arc from '@architect/functions'

const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async () => {
  // TODO: paginate these queries
  // ? can i filter by updatedAt and then LIMIT?
  const favoritesQuery = await things.query({
    IndexName: 'thingsByType',
    KeyConditionExpression: '#type = :omnivoreFavs',
    ExpressionAttributeNames: { '#type': 'type' },
    ExpressionAttributeValues: { ':omnivoreFavs': 'omnivore:favorite' },
  })
  const highlightsQuery = await things.query({
    IndexName: 'thingsByType',
    KeyConditionExpression: '#type = :omnivoreHighlights',
    ExpressionAttributeNames: { '#type': 'type' },
    ExpressionAttributeValues: { ':omnivoreHighlights': 'omnivore:highlight' },
  })
  const savedQuery = await things.query({
    IndexName: 'thingsByType',
    KeyConditionExpression: '#type = :omnivorePages',
    ExpressionAttributeNames: { '#type': 'type' },
    ExpressionAttributeValues: { ':omnivorePages': 'omnivore:page' },
  })

  function sort(a, b) {
    return !a || !b ? 0 : a.updatedAt - b.updatedAt
  }

  // TODO: trim lists

  return {
    json: {
      omnivoreHighlights: highlightsQuery.Items.sort(sort),
      omnivoreSaved: savedQuery.Items.sort(sort),
      omnivoreFavorites: favoritesQuery.Items.sort(sort),
    },
  }
}
