import { Collection } from 'waylon'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function BlogList({ html, state: { store } }) {
  const { articles = [] } = store
  const collection = new Collection(articles)

  return html`

${collection.render(
  'div',
  (i) => i.attrs({ class: 'article' }),
  (item) => `
      <h3>${item.link(`/blog/${item.i.slug.current}`, item.i.title)}</h3>
      <time>${item.presentDate(new Date(item.i.publishedAt))}</time>
      <p>${item.i.description}</p>
    `,
)}

  `
}
