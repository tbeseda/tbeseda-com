/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentOmnivoreFavorites ({
  html,
  state: { store }
}) {
  const { omnivoreFavorites } = store

  if (!omnivoreFavorites?.length) return html`<p>No favorites yet.</p>`

  function presentFav ({ entity: labelFav, updatedAt }) {
    if (!labelFav?.page) return html`<p>Missing article data</p>`

    const { title, url, description } = labelFav.page

    return `
      <div class="omnivore-fav">
        <h3><a href="${url}" target="_blank">${title}</a></h3>
        <p><small>favorited: ${new Date(updatedAt).toLocaleDateString()}</small></p>
        <p>${description}</p>
      </div>
    `
  }

  return html`
    <h2>All-Time Favorites</h2>
    <c-grid cols="1">
      ${omnivoreFavorites.map(presentFav).join('')}
    </c-grid>
  `
}
