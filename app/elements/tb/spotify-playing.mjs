// waveform help 🙇
// https://codepen.io/yomateo/pen/ypbNrJ
// https://dev.to/rolandixor/css-funstuff-animated-waveforms-4cja

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbSpotifyPlaying({ html, state: { store } }) {
	const { currentlyPlaying } = store
	if (!currentlyPlaying?.item) return ''

	const playing = currentlyPlaying.item
	console.log(playing)

	return html`
		<style>
			:host {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 0.8rem;
				cursor: pointer;
				--m: 10;
				--wavefreq: calc(100ms * var(--m));
			}

			.track {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 0.8rem;
			}
			.track-name-artist {
				width: 100%;
				display: flex;
				justify-content: space-between;
				gap: 0.5rem;
			}
			.track-name {
				font-weight: 500;
			}
			.track-album {
				font-weight: 300;
				font-size: 0.75rem;
			}

			.waveform {
				display: flex;
				height: 1.25rem;
				gap: 2px;
			}
			.bar {
				height: 100%;
				width: 2px;
				background: #1DB954;
				border-radius: 2px;
				animation: waveform var(--wavefreq)
									 ease-in-out infinite forwards;
			}
			.bar:nth-child(1) {
				--wavefreq: calc(200ms * var(--m));
			}
			.bar:nth-child(2) {
				--wavefreq: calc(300ms * var(--m));
			}
			.bar:nth-child(3) {
				--wavefreq: calc(400ms * var(--m));
			}
			.bar:nth-child(4) {
				--wavefreq: calc(500ms * var(--m));
			}
			.bar:nth-child(5) {
				--wavefreq: calc(600ms * var(--m));
			}
			@keyframes waveform {
				0% { transform: scaleY(0.5); }
				50% { transform: scaleY(1); }
				100% { transform: scaleY(0.5); }
			}
		</style>

		<div class="waveform">
			<div class="bar"></div>
			<div class="bar"></div>
			<div class="bar"></div>
			<div class="bar"></div>
			<div class="bar"></div>
		</div>

		<div class="track">
			<span class="track-name-artist">
				<span class="track-name">"${playing.name}"</span>
				<span class="track-artist">
					${playing.artists.map(({ name }) => name).join(', ')}
				</span>
			</span>
			<span class="track-album">
				${playing.album.name}
				(${playing.album.release_date.slice(0, 4)})
			</span>
		</div>

		<script type="module">
			class TbSpotifyPlaying extends HTMLElement {
				constructor() {
					super()
				}
				connectedCallback() {
					this.addEventListener('click', () => {
						window.open('${playing.external_urls.spotify}', '_blank')
					})
				}
			}

			customElements.define('tb-spotify-playing', TbSpotifyPlaying)
		</script>
	`
}
