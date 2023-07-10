function timestamp(duration) {
	const minutes = Math.floor((duration / (1000 * 60)) % 60)
	const seconds = Math.floor((duration / 1000) % 60)
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentSpotify({ html, state: { store } }) {
	const {
		authorized,
		currentlyPlaying,
		recentlyPlayed = { items: [] },
		topArtists = { items: [] },
		messages,
	} = store
	const playing = currentlyPlaying?.item
	const mostRecent = recentlyPlayed.items[0]?.track
	const nextRecent = recentlyPlayed.items.slice(1, 5).map(({ track }) => track)

	return html`
		<style>
			h3 {
				margin-top: 2rem;
			}
			details {
				margin-top: 2rem;
			}
			details > div {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				gap: 1rem;
			}
			.row {
				background: rgba(210, 210, 255, 0.1);
				display: grid;
				grid-template-columns: auto 1fr auto auto;
				align-items: center;
				justify-content: space-between;
				gap: 1rem;
				padding: 1rem;
			}
			.row.track {
			}
			.row.artist {
				grid-template-columns: 1fr auto;
				border-bottom: 1px solid #333;
			}
			.row.artist:last-of-type {
				border-bottom: none;
			}
			.row.dense {
			}
			.row.denser {
				background: none;
				padding: 0.25rem 1rem;
			}
			img {
				max-height: 120px;
				max-width: 120px;
			}
			img.album-cover {
				box-shadow: 0px 1px 1px rgba(3, 7, 18, 0.02),
					0px 3px 4px rgba(3, 7, 18, 0.03),
					0px 7px 9px rgba(3, 7, 18, 0.05),
					0px 13px 15px rgba(3, 7, 18, 0.06),
					0px 20px 24px rgba(3, 7, 18, 0.08);
			}
			.dense img {
				max-height: 75px;
				max-width: 75px;
			}
			.denser img {
				max-height: 50px;
				max-width: 50px;
			}
			.album-info {
				text-align: right;
			}
		</style>

		${authorized ? '<p><a href="/auth/spotify/login">re-auth</a></p>' : ''}

		<h2>My Spotify Activity</h2>

		${messages?.map((message) => `<p>${message}</p>`).join('')}

		${
			playing
				? `<h3>Currently Playing</h3>
					<div class="row track">
						<img class="album-cover" src="${playing.album.images[0].url}" alt="album cover" />
						<span class="track-info">
							<span class="playing-progress">
								${
									currentlyPlaying.is_playing
										? '&#9658;'
										: '&#9616;&nbsp;&#9612;'
								}
								${timestamp(currentlyPlaying.progress_ms)} /
								${timestamp(playing.duration_ms)}
							</span><br>
							<strong class="track-name">${playing.name}</strong>
							<br>
							<span class="artist">${playing.artists
								.map(({ name }) => name)
								.join(', ')}
							</span>
						</span>
						<span class="album-info">
							${playing.album.name}<br>
							${playing.album.release_date.split('-')[0]}
						</span>
					</div>`
				: ''
		}

		<h3>Recently Played</h3>
		${
			mostRecent
				? `<div class="row track">
						<img class="album-cover" src="${mostRecent.album.images[0].url}" alt="album cover" />
						<span class="track-info">
							<strong class="track-name">${mostRecent.name}</strong><br>
							<span class="artist">${mostRecent.artists
								.map(({ name }) => name)
								.join(', ')}</span>
						</span>
						<span class="album-info">
							${mostRecent.album.name}<br>
							${mostRecent.album.release_date.split('-')[0]}
						</span>
					</div>`
				: ''
		}
		${
			nextRecent.length
				? nextRecent
						.map(
							(track) => `
						<div class="row track dense">
							<img class="album-cover" src="${track.album.images[0].url}" alt="album cover" />
							<span class="track-info">
								<strong class="track-name">${track.name}</strong><br>
								<span class="artist">${track.artists
									.map(({ name }) => name)
									.join(', ')}</span>
							</span>
							<span class="album-info">
								${track.album.name}<br>
								${track.album.release_date.split('-')[0]}
							</span>
						</div>
					`,
						)
						.join('')
				: ''
		}

		<details>
			<summary>More Stats</summary>
			<div>
				<div>
					<h3>Top Artists</h3>
					${topArtists.items
						.map(
							({ name, images }, i) => `
							<div class="row artist denser">
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
				</div>
				<div>
					<h3>Top Tracks</h3>
					<p>wip</p>
				</div>
				<div>
					<h3>Authored Playlists</h3>
					<p>wip</p>
				</div>
			</div>
		</details>
	`
}
