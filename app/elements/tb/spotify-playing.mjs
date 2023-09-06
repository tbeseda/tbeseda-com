// waveform help 🙇
// https://codepen.io/yomateo/pen/ypbNrJ
// https://dev.to/rolandixor/css-funstuff-animated-waveforms-4cja

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbSpotifyPlaying({ html, state: { store } }) {
	const { currentlyPlaying } = store
	if (!currentlyPlaying?.item) return ''

	const playing = currentlyPlaying.item

	const albumCover = playing.album.images.find(
		({ height }) => height < 301,
	)?.url

	return html`
		<style>
			:host {
				display: grid;
				grid-template-columns: 1fr auto 1fr;
				align-items: center;
				gap: 0.666rem;
				cursor: pointer;
				--m: 6;
				--wavefreq: calc(100ms * var(--m));
			}

			album-cover {
				width: 55px;
				height: 55px;
				place-items: center;
			}
			track-info {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			track-info track-name {
				font-weight: 666;
			}
			track-info track-album {
				font-weight: 300;
				font-size: 0.75rem;
			}

			wave-form {
				display: flex;
				height: 25px;
				gap: 3px;
			}
			wave-bar {
				display: block;
				height: 100%;
				width: 3px;
				background: limegreen;
				border-radius: 2px;
				animation: waveform var(--wavefreq)
									 ease-in-out infinite forwards;
			}
			wave-bar:nth-child(1) {
				--wavefreq: calc(200ms * var(--m));
			}
			wave-bar:nth-child(2) {
				--wavefreq: calc(300ms * var(--m));
			}
			wave-bar:nth-child(3) {
				--wavefreq: calc(400ms * var(--m));
			}
			wave-bar:nth-child(4) {
				--wavefreq: calc(500ms * var(--m));
			}
			wave-bar:nth-child(5) {
				--wavefreq: calc(600ms * var(--m));
			}
			@keyframes waveform {
				0% { transform: scaleY(0.5); }
				50% { transform: scaleY(1); }
				100% { transform: scaleY(0.5); }
			}
		</style>

		<album-cover>
			<img src="${albumCover}" alt="${playing.album.name}"/>
		</album-cover>

		<track-info>
			<track-name>${playing.name}</track-name>

			<track-artist>
				${playing.artists.map(({ name }) => name).join(', ')}
			</track-artist>

			<track-album>
				${playing.album.name}
				(${playing.album.release_date.slice(0, 4)})
			</track-album>
		</track-info>

		<wave-form>
			<wave-bar></wave-bar>
			<wave-bar></wave-bar>
			<wave-bar></wave-bar>
			<wave-bar></wave-bar>
			<wave-bar></wave-bar>
		</wave-form>

		<script type="module">
			class TbSpotifyPlaying extends HTMLElement {
				constructor() {
					super()
				}
				connectedCallback() {
					this.addEventListener('click', () => {
						window.location = '/experiments/spotify'
					})
				}
			}

			customElements.define('tb-spotify-playing', TbSpotifyPlaying)
		</script>
	`
}
