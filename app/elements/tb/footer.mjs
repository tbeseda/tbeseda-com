/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbFooter({ html, state: { store } }) {
	const { currentlyPlaying, icon } = store
	return html`
		<style>
			:host {
				display: block;
				width: 100%;
				max-width: 66rem;
				margin: 0 auto;
				padding: 2rem 1rem 0;
			}
			footer {
				margin-bottom: 1rem;
				display: grid;
				grid-template-columns: 1fr auto 1fr;
				align-items: center;
				font-size: 0.9rem;
			}
			footer > div.icon {
				text-align: center;
				font-size: 2rem;
			}
			footer > div.say-hi {
				text-align: right;
			}

			@media (max-width: 600px) {
				footer {
					grid-template-columns: 1fr;
					grid-template-rows: auto auto auto;
					gap: 1.25rem;
				}
				footer > div,
				footer > div.say-hi {
					text-align: center;
				}
				footer > div.icon,
				footer > tb-spotify-playing {
					grid-row: 1;
				}
				footer > div.say-hi {
					grid-row: 2;
				}
				footer > div.copyright {
					grid-row: 3;
				}
			}
		</style>
		<style scope="global">
			body {
				display: grid;
				grid-template-rows: auto 1fr auto;
			}
		</style>

		<footer>
			<div class="copyright">
				&copy; tbeseda ${new Date().getFullYear().toString()}.
			</div>

			${
				currentlyPlaying?.item
					? '<tb-spotify-playing></tb-spotify-playing>'
					: `<div class="icon">${icon}</div>`
			}

			<div class="say-hi">
				<span>Say "hi" on</span>
				<a rel="me" href="https://indieweb.social/@tbeseda">Mastodon</a>
			</div>
		</footer>
	`
}
