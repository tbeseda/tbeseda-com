/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbFooter({ html, state: { store } }) {
	return html`
		<footer>
			${store.icon}
			•
			<span>
				Say "hi" on <a rel="me" href="https://indieweb.social/@tbeseda">Mastodon</a>
			</span>
			•
			<code>
				<a href="/h-card">/h-card</a>
			</code>
		</footer>
	`
}
