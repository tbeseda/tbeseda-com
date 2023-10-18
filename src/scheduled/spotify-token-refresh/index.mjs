import arc from '@architect/functions'

const { ARC_ENV, SPOTIFY_CLIENT, SPOTIFY_SECRET } = process.env
const key = 'spotify-token'
const { things } = await arc.tables()

export async function handler () {
  if (ARC_ENV === 'staging') return

  if (!(SPOTIFY_CLIENT && SPOTIFY_SECRET)) {
    console.error('Missing Spotify environment variables')
    return
  }

  let existingToken
  let refreshToken
  try {
    const previousToken = await things.get({ key })
    existingToken = previousToken.token
    refreshToken = existingToken.refresh_token
  } catch (error) {
    console.log('error reading existingToken', error)
  }

  if (!refreshToken) {
    console.error('Missing refresh token')
    return
  }

  let newToken
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT}:${SPOTIFY_SECRET}`
        ).toString('base64')}`,
        Accept: 'application/json'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }).toString()
    })
    newToken = await response.json()

    if (newToken.error) {
      console.error(`${newToken.error}: ${newToken.error_description}`)
      return
    }

    const savedToken = await things.put({
      key,
      token: {
        ...existingToken,
        ...newToken
      },
      created: new Date().toISOString()
    })

    console.log(`Saved ${savedToken.key}`)
  } catch (error) {
    console.log('token POST error', error)
  }
}
