/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentSpotify({ html, state: { store } }) {
	const {
		currentlyPlaying,
		recentlyPlayed = { items: [] },
		topArtists = { items: [] },
		messages,
	} = store
	const playing = currentlyPlaying?.item
	const mostRecent = recentlyPlayed.items[0]?.track
	const nextRecent = recentlyPlayed.items.slice(1, 5).map(({ track }) => track)
	console.log('currentlyPlaying', currentlyPlaying)

	return html`
		<style>
			h3 {
				margin-top: 2rem;
			}
			.row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 1rem;
				padding: 0.5rem;
			}
			img {
				max-height: 100px;
				max-width: 100px;
			}
			.dense img {
				max-height: 50px;
				max-width: 50px;
			}
			p.auth {
				margin-top: 10rem;
				text-align: right;
				font-size: 0.75rem;
				opacity: 0.1;
			}
		</style>

		<h2>Spotify Activity</h2>

		${messages?.map((message) => `<p>${message}</p>`).join('')}

		${
			playing
				? `<h3>Currently Playing</h3>
					<div class="row">
						<span>
							"<em>${playing.name}</em>"<br>
							${playing.artists.map(({ name }) => name).join(', ')}
						</span>
						<span>${playing.album.name}</span>
						<span>
							${currentlyPlaying.is_playing ? '▶️' : '⏸️'}
							${Math.round(
								(currentlyPlaying.progress_ms / playing.duration_ms) * 100,
							)}%
						</span>
						<img src="${playing.album.images[0].url}" alt="album cover" />
					</div>`
				: ''
		}

		<h3>Recently Played</h3>
		${
			mostRecent
				? `<div class="row">
						<span>
							"<em>${mostRecent.name}</em>"<br>
							${mostRecent.artists.map(({ name }) => name).join(', ')}
						</span>
						<span>${mostRecent.album.name}</span>
						<span>
							${new Date(recentlyPlayed.items[0].played_at).toLocaleString(
								'en-us',
								{
									timeZone: 'America/Denver',
									weekday: 'short',
									day: 'numeric',
									month: 'long',
									hour: 'numeric',
									minute: 'numeric',
								},
							)}
						</span>
						<img src="${mostRecent.album.images[0].url}" alt="album cover" />
					</div>`
				: 'No recently played found'
		}
		${
			nextRecent.length
				? nextRecent
						.map(
							(track) => `
						<div class="row dense">
							<span>
								"<em>${track.name}</em>"<br>
								${track.artists.map(({ name }) => name).join(', ')}
							</span>
							<span>${track.album.name}</span>
							<img src="${track.album.images[0].url}" alt="album cover" />
						</div>
					`,
						)
						.join('')
				: ''
		}

		<h3>Top Artists</h3>
		${topArtists.items
			.map(
				({ name, images }, i) => `
				<div class="row dense">
					<span>${i + 1}. ${name}</span>
					${
						images.length
							? `<img src="${images[0].url}" alt="image of ${name}" />`
							: ''
					}
				</div>
			`,
			)
			.join('')}

		<p class="auth"><a href="/auth/spotify/login">auth</a></p>
	`
}
