/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state: { store } }) {
	const { mentions } = store

	console.log(mentions)

	return mentions?.length > 0
		? html`
		<h2 class="mb-1 text0 font-bold">Article Webmentions</h2>
		<ul class="list-none grid flow-row gap-2">
			${mentions
				// TODO: markup with microformats
				.map(
					(m) => `
						<li>
							<a href="${m.source}">
								${m.sourceTitle || m.source}
							</a>
							<small class="ml-4 text-1">${
								m.sourceAuthor ? `(${m.sourceAuthor})` : ''
							}</small>
						</li>
					`,
				)
				.join('')}
		</ul>
	`
		: ''
}
