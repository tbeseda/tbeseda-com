import arc from '@architect/functions'

const { things } = await arc.tables()

export default async function spotifyPlaying(_, data) {
  let currentlyPlaying
  try {
    const currentlyPlayingThing = await things.get({
      key: 'spotify-currently-playing',
    })

    currentlyPlaying = currentlyPlayingThing.currentlyPlaying
  } catch {
    // nbd
  }

  data.currentlyPlaying = currentlyPlaying
}
