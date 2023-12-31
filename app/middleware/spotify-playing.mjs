import arc from '@architect/functions'

const { things } = await arc.tables()

export default async function spotifyPlaying (_req, data) {
  let currentlyPlaying
  data.timers.start('spotify', 'tb-spotify-playing')
  try {
    const currentlyPlayingThing = await things.get({
      key: 'spotify-currently-playing',
    })

    currentlyPlaying = currentlyPlayingThing.currentlyPlaying
  } catch (error) {
    // nbd
  }
  data.timers.stop('spotify')

  data.currentlyPlaying = currentlyPlaying
}
