/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state: { store } }) {
	const { article } = store

	return html`
		<style>

		</style>

		${article.html}
	`
}
