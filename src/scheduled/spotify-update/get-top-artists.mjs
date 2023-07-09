import arc from '@architect/functions'

const topArtistsKey = 'spotify-top-artists'
const { things } = await arc.tables()

export default async function getTopArtists(token) {
	try {
		const params = new URLSearchParams({
			time_range: 'short_term',
			limit: '5',
		})
		const response = await fetch(
			`https://api.spotify.com/v1/me/top/artists?${params.toString()}`,
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${token.access_token}` },
			},
		)
		const topArtists = await response.json()

		if (topArtists.error) {
			console.error(`${topArtists.error}: ${topArtists.error_description}`)
			return
		}

		const savedTopArtists = await things.put({
			key: topArtistsKey,
			topArtists,
		})

		console.log(`Saved ${savedTopArtists.key}`)
	} catch (error) {
		console.log('me/top/artists error', error)
	}
}
