import arc from '@architect/functions'

const { things } = await arc.tables()

export default async function spotifyPlaying (req) {
  let currentlyPlaying
  try {
    const currentlyPlayingThing = await things.get({
      key: 'spotify-currently-playing',
    })

    currentlyPlaying = currentlyPlayingThing.currentlyPlaying
  } catch (error) {
    // nbd
  }

  req.currentlyPlaying = currentlyPlaying
}
