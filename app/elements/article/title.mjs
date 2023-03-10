/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state: { store } }) {
	const { article } = store
	const { path, title } = article

	return html`
		<h1>
			<span class="p-name">
				<slot></slot>
				${title}
			</span>
			<a href="${path}">🔗</a>
		</h1>
	`
}
