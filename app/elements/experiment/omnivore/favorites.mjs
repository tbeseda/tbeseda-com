/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentOmnivoreFavorites({
	html,
	state: { store },
}) {
	const { omnivoreFavorites } = store

	if (!omnivoreFavorites?.length) return html`<p>No favorites yet.</p>`

	function presentFav({ entity: labelFav }) {
		if (!labelFav?.page) return html`<p>Missing article data</p>`

		const { title, url, description, publishedAt } = labelFav.page

		return `
			<div class="omnivore-fav">
				<h3><a href="${url}" target="_blank">${title}</a></h3>
				${
					publishedAt
						? `<p><small>published: ${new Date(
								publishedAt,
						  ).toLocaleDateString()}</small></p>`
						: ''
				}
				<p>${description}</p>
			</div>
		`
	}

	return html`
		<h2>All-Time Favorites</h2>
		${omnivoreFavorites.map(presentFav).join('')}
	`
}
