/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbFooter({ html, state: { store } }) {
	return html`
		<style>
			footer {
				text-align: center;
			}
		</style>

		<footer>
			${store.icon}
			&nbsp;
			Say "hi" on <a rel="me" href="https://indieweb.social/@tbeseda">Mastodon</a>
		</footer>
	`
}
