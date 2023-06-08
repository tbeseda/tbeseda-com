function randomIconEmoji() {
	const emojis = ['🛻', '👢', '🎮', '🏔️', '🏕️', '🦬', '🦌', '⚾️']
	return emojis[(emojis.length * Math.random()) | 0]
}

export default async function (req) {
	req.state = req.state || {}
	req.state.icon = randomIconEmoji()
}
