/** @type {import('@enhance/types').EnhanceElemFn} */
export default function BlogRecentArticle ({ html, state: { store } }) {
  const { recentArticle } = store

  return recentArticle
    ? html`
    <style>
      :host {
        display: block;
      }
    </style>
    <h4>
      <a href="/blog/${recentArticle.slug}">${recentArticle.title}</a>
    </h4>
    <p>${recentArticle.description}</p>
  `
    : html`<p>no recent article</p>`
}
