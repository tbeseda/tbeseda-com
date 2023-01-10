/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state: { store } }) {
	const { mentions } = store

	return mentions?.length > 0 ? html`
		<h2 class="mb-1 text0 font-bold">Article Webmentions</h2>
		<ul class="list-none grid flow-row gap-2">
			${mentions.map(m => `<li>${m.source}</li>`).join('')}
		</ul>
	` : ''
}
