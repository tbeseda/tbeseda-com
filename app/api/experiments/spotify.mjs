import arc from '@architect/functions'
import standardMiddleware from '../../middleware/common.mjs'

const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '⛔️', hCards = [], currentlyPlaying }) {
	const messages = []
	if (!currentlyPlaying) messages.push('Nothing currently playing')

	let recentlyPlayed
	let topArtists
	try {
		const recentlyPlayedThing = await things.get({
			key: 'spotify-recently-played',
		})
		const topArtistsThing = await things.get({ key: 'spotify-top-artists' })

		recentlyPlayed = recentlyPlayedThing.recentlyPlayed
		topArtists = topArtistsThing.topArtists
	} catch (error) {
		// populate helpful messages
		if (!recentlyPlayed) messages.push('No recently played found')
		if (!topArtists) messages.push('No top artists found')

		const token = await things.get({ key: 'spotify-token' }) // double check token
		if (token)
			messages.push(`Spotify access token found, created ${token.created}`)
		else messages.push('No Spotify access token found')
	}

	return {
		json: {
			icon,
			hCards,
			currentlyPlaying,
			recentlyPlayed,
			topArtists,
			messages,
		},
	}
}

export const get = [...standardMiddleware, getHandler]
