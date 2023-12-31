import HeaderTimers from 'header-timers'
import addHCards from './add-h-cards.mjs'
import spotifyPlaying from './spotify-playing.mjs'

function log (req) {
  req.foo = 'bar'
  console.log(req.method, req.path)
}

async function timers (req) {
  req.timers = HeaderTimers()
  req.timers.start('total', 'tb-total')
}

async function randomIcon (_req, data) {
  const emojis = ['🛻', '👢', '🎮', '🏔️', '🏕️', '🦬', '🦌', '⚾️', '🎧']
  data.icon = emojis[(emojis.length * Math.random()) | 0]
}

export default [log, timers, addHCards, randomIcon, spotifyPlaying]
