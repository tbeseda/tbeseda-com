import arc from '@architect/functions'

const { things } = await arc.tables()

export default async function spotifyPlaying (req) {
  let currentlyPlaying
  req.timers.start('spotify', 'tb-spotify-playing')
  try {
    const currentlyPlayingThing = await things.get({
      key: 'spotify-currently-playing',
    })

    currentlyPlaying = currentlyPlayingThing.currentlyPlaying
  } catch (error) {
    // nbd
  }
  req.timers.stop('spotify')

  req.currentlyPlaying = currentlyPlaying
}
