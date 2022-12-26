/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbFooter({ html, state: { store } }) {
	return html`
		<footer class="flex flex-row justify-center items-end gap-4">
			${store.icon}
			•
			<p class="text-1">
				Say "hi" on <a class="" rel="me" href="https://indieweb.social/@tbeseda">Mastodon</a>
			</p>
			•
			<code class="text-1 font-mono opacity-50">
				<a href="/h-card" class="no-underline">/h-card</a>
			</code>
		</footer>
	`
}
