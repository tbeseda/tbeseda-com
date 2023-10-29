import { Buffer } from 'node:buffer'
import { URLSearchParams } from 'node:url'
import arc from '@architect/functions'

const { ARC_ENV, SPOTIFY_CLIENT, SPOTIFY_SECRET, SPOTIFY_REDIRECT } =
  process.env
const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get ({ query, session }) {
  if (ARC_ENV === 'staging') return { text: 'Not prod' }

  if (!(SPOTIFY_CLIENT && SPOTIFY_SECRET && SPOTIFY_REDIRECT)) { throw new Error('Missing Spotify environment variables') }

  const { code, state } = query
  const { spotifyState } = session
  delete session.state

  if (state !== spotifyState) throw new Error('Invalid state')

  let token
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT}:${SPOTIFY_SECRET}`,
        ).toString('base64')}`,
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        redirect_uri: SPOTIFY_REDIRECT,
      }).toString(),
    })
    token = await response.json()

    if (token.error) { throw new Error(`${token.error}: ${token.error_description}`) }

    const savedToken = await things.put({
      key: 'spotify-token',
      token,
      created: new Date().toISOString(),
    })

    console.log(`Saved ${savedToken.key}`)
  } catch (error) {
    console.log('token POST error', error)
  }

  return {
    status: 302,
    headers: { location: '/experiments/spotify' },
  }
}
