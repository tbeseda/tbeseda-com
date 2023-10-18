import arc from '@architect/functions'

const recentlyPlayedKey = 'spotify-recently-played'
const { things } = await arc.tables()

export default async function getRecentlyPlayed (token) {
  try {
    const params = new URLSearchParams({
      limit: '6',
      before: Date.now().toString()
    })
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?${params.toString()}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token.access_token}` }
      }
    )
    const recentlyPlayed = await response.json()

    if (recentlyPlayed.error) {
      console.error(
        `${recentlyPlayed.error}: ${recentlyPlayed.error_description}`
      )
      return
    }

    const savedRecentlyPlayed = await things.put({
      key: recentlyPlayedKey,
      recentlyPlayed,
      created: new Date().toISOString()
    })

    console.log(`Saved ${savedRecentlyPlayed.key}`)
  } catch (error) {
    console.log('me/player/recently-played error', error)
  }
}
