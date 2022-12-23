import randomIconEmoji from '../lib/random-icon-emoji.mjs'

export default async function (req) {
	req.state = req.state || {}
	req.state.icon = randomIconEmoji()
}
