import addHCards from './add-h-cards.mjs'

async function randomIcon(req) {
	const emojis = ['🛻', '👢', '🎮', '🏔️', '🏕️', '🦬', '🦌', '⚾️']
	req.icon = emojis[(emojis.length * Math.random()) | 0]
}

export default [addHCards, randomIcon]
