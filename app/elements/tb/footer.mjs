/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbFooter({ html, state: { store } }) {
	return html`
		<style>
			:host {
				display: block;
				width: 100%;
				max-width: 94ch;
				margin: 0 auto;
				padding: 2rem 1rem 0;
			}
			footer {
				display: grid;
				grid-template-columns: 1fr auto 1fr;
				align-items: center;
				font-size: 0.9rem;
				opacity: 0.75;
			}
			footer:hover {
				opacity: 1;
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
					gap: 1rem;
					grid-direction: column;
				}
				footer > div,
				footer > div.say-hi {
					text-align: center;
				}
				footer > div.icon {
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
				Copyright © Taylor Beseda ${new Date().getFullYear().toString()}.<br>
				All rights reserved.
			</div>
			<div class="icon">${store.icon}</div>
			<div class="say-hi">
				&nbsp;
				Say "hi" on <a rel="me" href="https://indieweb.social/@tbeseda">Mastodon</a>
			</div>
		</footer>
	`
}
