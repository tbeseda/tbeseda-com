import arc from '@architect/functions'

const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async ({ timers, session }) => {
  let { authorized } = session
  authorized = !!authorized

  const messages = []
  let recentlyPlayed
  let topArtists
  let topTracks
  timers.start('spotify-stats', 'tb-spotify-stats')
  try {
    const recentlyPlayedThing = await things.get({ key: 'spotify-recently-played' })
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
    if (token) {
      messages.push(`Spotify access token found, created ${token.created}`)
    } else messages.push('No Spotify access token found')
  }
  timers.stop('spotify-stats')

  timers.stop('total')
  return {
    headers: { ...timers.toObject() },
    json: {
      authorized,
      recentlyPlayed,
      topArtists,
      topTracks,
      messages,
    },
  }
}