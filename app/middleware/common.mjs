import HeaderTimers from 'header-timers'
import addHCards from './add-h-cards.mjs'
import spotifyPlaying from './spotify-playing.mjs'

export async function timers (data) {
  data.timers = HeaderTimers()
  data.timers.start('total', 'tb-total')
}

export async function randomIcon (data) {
  const emojis = ['🛻', '👢', '🎮', '🏔️', '🏕️', '🦬', '🦌', '⚾️', '🎧']
  data.icon = emojis[(emojis.length * Math.random()) | 0]
}

export default [timers, addHCards, randomIcon, spotifyPlaying]
