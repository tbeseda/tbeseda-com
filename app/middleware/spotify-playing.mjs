import arc from '@architect/functions'

const { things } = await arc.tables()

export default async function spotifyPlaying ({ timers }, data) {
  let currentlyPlaying
  timers.start('spotify-playing', 'tb-spotify-playing')
  try {
    const currentlyPlayingThing = await things.get({
      key: 'spotify-currently-playing',
    })

    currentlyPlaying = currentlyPlayingThing.currentlyPlaying
  } catch (error) {
    // nbd
  }
  timers.stop('spotify-playing')

  data.currentlyPlaying = currentlyPlaying
}
