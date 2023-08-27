import addHCards from './add-h-cards.mjs'
import spotifyPlaying from './spotify-playing.mjs'

async function simpleLog(req) {
	console.log(req.method, req.path)
}

async function randomIcon(req) {
	const emojis = ['🛻', '👢', '🎮', '🏔️', '🏕️', '🦬', '🦌', '⚾️', '🎧']
	req.icon = emojis[(emojis.length * Math.random()) | 0]
}

export default [simpleLog, addHCards, randomIcon, spotifyPlaying]
