import arc from '@architect/functions'
import getCurrentlyPlaying from './get-currently-playing.mjs'
import getRecentlyPlayed from './get-recently-played.mjs'
import getTop from './get-top-type.mjs'

const { ARC_ENV } = process.env
const tokenKey = 'spotify-token'
const { things } = await arc.tables()

export async function handler() {
  if (ARC_ENV === 'staging') return

  let token
  try {
    const previousToken = await things.get({ key: tokenKey })
    token = previousToken.token
  } catch (error) {
    console.log('error reading existingToken', error)
  }

  if (!token) {
    console.error('Missing refresh token')
    return
  }

  await getCurrentlyPlaying(token)
  await getTop('artists', token)
  await getTop('tracks', token)
  await getRecentlyPlayed(token)
}
