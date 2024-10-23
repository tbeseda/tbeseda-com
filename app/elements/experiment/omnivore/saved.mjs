/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentOmnivoreSaved({ html, state: { store } }) {
  const { omnivoreSaved } = store

  if (!omnivoreSaved?.length) return html`<p>No saved articles yet.</p>`

  function presentArticle({ entity: page, updatedAt }) {
    if (!page) return html`<p>Missing article data</p>`

    const { title, url, description } = page

    return `
      <div class="omnivore-article">
        <h3><a href="${url}" target="_blank">${title}</a></h3>
        <p><small>saved: ${new Date(updatedAt).toLocaleDateString()}</small></p>
        <p>${description}</p>
      </div>
    `
  }

  return html`
    <h2>Recently Saved Articles</h2>
    ${omnivoreSaved.map(presentArticle).join('')}
  `
}
