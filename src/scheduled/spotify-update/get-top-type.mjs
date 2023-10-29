import arc from '@architect/functions'

const { things } = await arc.tables()

/**
 *
 * @param {string} type Spotify thing type
 * @param {object} token Spotify access token
 * @returns {Promise<void>}
 */
export default async function getTop (type, token) {
  const topTypeKey = `spotify-top-${type}`
  try {
    const params = new URLSearchParams({
      time_range: 'short_term',
      limit: '10',
    })
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/${type}?${params.toString()}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token.access_token}` },
      },
    )
    const topTypes = await response.json()

    if (topTypes.error) {
      console.error(`${topTypes.error}: ${topTypes.error_description}`)
      return
    }

    const savedTopTypes = await things.put({
      key: topTypeKey,
      [`top${type[0].toUpperCase() + type.slice(1)}`]: topTypes,
      created: new Date().toISOString(),
    })

    console.log(`Saved ${savedTopTypes.key}`)
  } catch (error) {
    console.log(`me/top/${type} error`, error)
  }
}
