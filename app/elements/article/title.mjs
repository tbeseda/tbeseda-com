/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state: { store } }) {
	const { article } = store
	const { path, title } = article

	return html`
		<h1 class="flex flex-row justify-start items-center gap-4">
			<span class="p-name text3 font-semibold">
				<slot></slot>
				${title}
			</span>
			<a class="text-1 opacity-50 no-underline" href="${path}">🔗</a>
		</h1>
	`
}
