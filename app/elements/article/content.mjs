/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state: { store } }) {
	const { article } = store

	return html`
		<div class="mb1 font-serif">
			${article.content}
		</div>

		<code class="text-1 font-mono opacity-25">/articles/${article.slug}</code>
	`
}
