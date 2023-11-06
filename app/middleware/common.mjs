import HeaderTimers from 'header-timers'
import addHCards from './add-h-cards.mjs'
import spotifyPlaying from './spotify-playing.mjs'

async function timers (req) {
  req.timers = HeaderTimers()
  req.timers.start('total', 'tb-total')
}

async function simpleLog (req) {
  console.log(req.method, req.path)
}

async function randomIcon (req) {
  const emojis = ['🛻', '👢', '🎮', '🏔️', '🏕️', '🦬', '🦌', '⚾️', '🎧']
  req.icon = emojis[(emojis.length * Math.random()) | 0]
}

export default [timers, simpleLog, addHCards, randomIcon, spotifyPlaying]
