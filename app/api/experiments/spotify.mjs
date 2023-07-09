import arc from '@architect/functions'
import standardMiddleware from '../../middleware/common.mjs'

const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '😵', hCards = [] }) {
	const messages = []
	let currentlyPlaying // ? retrieve on request
	let recentlyPlayed
	let topArtists
	try {
		const currentlyPlayingThing = await things.get({
			key: 'spotify-currently-playing',
		})
		const recentlyPlayedThing = await things.get({
			key: 'spotify-recently-played',
		})
		const topArtistsThing = await things.get({ key: 'spotify-top-artists' })

		currentlyPlaying = currentlyPlayingThing.currentlyPlaying
		recentlyPlayed = recentlyPlayedThing.recentlyPlayed
		topArtists = topArtistsThing.topArtists
	} catch (error) {
		if (!currentlyPlaying) messages.push('No currently playing found')
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
