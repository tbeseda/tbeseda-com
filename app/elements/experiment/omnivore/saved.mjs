/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentOmnivoreSaved({ html, state: { store } }) {
	const { omnivoreSaved } = store

	if (!omnivoreSaved?.length) return html`<p>No saved articles yet.</p>`

	function presentArticle({ entity: page }) {
		if (!page) return html`<p>Missing article data</p>`

		const { title, url, description, publishedAt } = page

		return `
			<div class="omnivore-article">
				<h3><a href="${url}" target="_blank">${title}</a></h3>
				${
					publishedAt
						? `<p><small>saved: ${new Date(
								publishedAt,
						  ).toLocaleDateString()}</small></p>`
						: ''
				}
				<p>${description}</p>
			</div>
		`
	}

	return html`
		<h2>Recently Saved Articles</h2>
		<c-grid cols="1_1">
			${omnivoreSaved.map(presentArticle).join('')}
		</c-grid>
	`
}
