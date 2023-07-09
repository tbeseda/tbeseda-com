// waveform help 🙇
// https://codepen.io/yomateo/pen/ypbNrJ
// https://dev.to/rolandixor/css-funstuff-animated-waveforms-4cja

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbSpotifyPlaying({ html, state: { store } }) {
	const { currentlyPlaying } = store
	if (!currentlyPlaying) return ''

	const playing = currentlyPlaying.item

	return html`
		<style>
			:host {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 0.8rem;
				cursor: pointer;
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
				height: 1.5rem;
				gap: 2px;
			}
			.bar {
				transform: scaleY(.5);
				height: 100%;
				width: 2px;
				background: #1DB954;
				animation-duration: 2s;
				animation-timing-function: ease-in-out;
				animation-iteration-count: infinite;
				border-radius: 2px;
			}
			.bar:nth-child(1) {
				animation-name: quiet;
			}
			.bar:nth-child(2) {
				animation-name: normal;
			}
			.bar:nth-child(3) {
				animation-name: quiet;
			}
			.bar:nth-child(4) {
				animation-name: loud;
			}
			.bar:nth-child(5) {
				animation-name: quiet;
			}
			@keyframes quiet {
				25% { transform: scaleY(.6); }
				50% { transform: scaleY(.4); }
				75% { transform: scaleY(.8); }
			}

			@keyframes normal {
				25% { transform: scaleY(1); }
				50% { transform: scaleY(.4); }
				75% { transform: scaleY(.6); }
			}
			@keyframes loud {
				25% { transform: scaleY(1); }
				50% { transform: scaleY(.4); }
				75% { transform: scaleY(1.2); }
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
