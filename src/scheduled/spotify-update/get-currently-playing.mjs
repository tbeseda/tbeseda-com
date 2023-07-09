import arc from '@architect/functions'

const currentlyPlayingKey = 'spotify-currently-playing'
const { things } = await arc.tables()

export default async function getCurrentlyPlaying(token) {
	try {
		const response = await fetch(
			'https://api.spotify.com/v1/me/player/currently-playing',
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${token.access_token}` },
			},
		)
		const currentlyPlaying = await response.json()

		if (currentlyPlaying.error) {
			console.error(
				`${currentlyPlaying.error}: ${currentlyPlaying.error_description}`,
			)
			return
		}

		const savedCurrentlyPlaying = await things.put({
			key: currentlyPlayingKey,
			currentlyPlaying,
		})

		console.log(`Saved ${savedCurrentlyPlaying.key}`)
	} catch (error) {
		console.log('me/player/currently-playing error', error)
	}
}
