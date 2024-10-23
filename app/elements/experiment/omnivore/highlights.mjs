/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentOmnivoreHighlights({ html, state: { store } }) {
  const { omnivoreHighlights } = store

  if (!omnivoreHighlights?.length) return html`<p>No highlights yet.</p>`

  function presentHighlight({ entity: highlight, updatedAt }) {
    if (!highlight?.page) return html`<p>Missing article data</p>`

    const { page, quote, annotation } = highlight
    const { title, url } = page
    const date = new Date(updatedAt).toLocaleDateString()

    return `
      <div class="omnivore-highlight">
        <h3><a href="${url}" target="_blank">${title}</a></h3>
        <p><small>highlighted: ${date}</small></p>
        <blockquote><mark>${quote}</mark></blockquote>
        ${annotation ? `<p>"${annotation}"</p>` : ''}
      </div>
    `
  }

  return html`
    <h2>Recent Highlights</h2>
    ${omnivoreHighlights.map(presentHighlight).join('')}
  `
}
