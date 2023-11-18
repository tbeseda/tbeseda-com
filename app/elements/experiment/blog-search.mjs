/** @type {import('@enhance/types').EnhanceElemFn} */
export default function BlogSearch ({ html, state: { store } }) {
  const { q, results } = store

  return html`
    <style>
      :host {
        display: block;
      }
    </style>

    <h1>Blog Search</h1>
    <p>Search the blog for articles containing a word or phrase.</p>

    <form>
      <input type="search" name="q" value="${q || ''}" placeholder="Search" />
      <button type="submit">Search</button>
    </form>

    <ul>
      ${results.map(({ id, title, slug }) => html`
        <li><a href="/blog/${slug}">${title}</a></li>
      `).join('')}
    </ul>

  `
}
