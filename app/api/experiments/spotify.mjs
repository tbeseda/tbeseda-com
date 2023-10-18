import arc from '@architect/functions'
import standardMiddleware from '../../middleware/common.mjs'

const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler ({
  icon = '⛔️',
  hCards = [],
  session,
  currentlyPlaying
}) {
  let { authorized } = session
  authorized = !!authorized

  const messages = []
  if (!currentlyPlaying) messages.push('Nothing currently playing')

  let recentlyPlayed
  let topArtists
  let topTracks
  try {
    const recentlyPlayedThing = await things.get({
      key: 'spotify-recently-played'
    })
    const topArtistsThing = await things.get({ key: 'spotify-top-artists' })
    const topTracksThing = await things.get({ key: 'spotify-top-tracks' })

    recentlyPlayed = recentlyPlayedThing.recentlyPlayed
    topArtists = topArtistsThing.topArtists
    topTracks = topTracksThing.topTracks
  } catch (error) {
    // populate helpful messages
    if (!recentlyPlayed) messages.push('No recently played found')
    if (!topArtists) messages.push('No top artists found')
    if (!topTracks) messages.push('No top tracks found')

    const token = await things.get({ key: 'spotify-token' }) // double check token
    if (token) { messages.push(`Spotify access token found, created ${token.created}`) } else messages.push('No Spotify access token found')
  }

  return {
    json: {
      authorized,
      icon,
      hCards,
      currentlyPlaying,
      recentlyPlayed,
      topArtists,
      topTracks,
      messages
    }
  }
}

export const get = [...standardMiddleware, getHandler]
