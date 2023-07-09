import arc from '@architect/functions'
import getTopArtists from './get-top-artists.mjs'
import getRecentlyPlayed from './get-recently-played.mjs'
import getCurrentlyPlaying from './get-currently-playing.mjs'

const { ARC_ENV } = process.env
const tokenKey = 'spotify-token'
const { things } = await arc.tables()

export async function handler() {
	if (ARC_ENV === 'staging') return

	let token
	try {
		const previousToken = await things.get({ key: tokenKey })
		token = previousToken.token
	} catch (error) {
		console.log('error reading existingToken', error)
	}

	if (!token) {
		console.error('Missing refresh token')
		return
	}

	await getCurrentlyPlaying(token)
	await getTopArtists(token)
	await getRecentlyPlayed(token)

	return
}
