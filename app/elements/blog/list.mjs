import { Collection } from 'waylon'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function BlogList ({ html, state: { store } }) {
  const { articles = [] } = store
  const collection = new Collection(articles)
  return html`
    <style>
      :host {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .article {
        display: flex;
        flex-direction: column;
      }
      .article * {
        margin: 0;
      }
      .article time {
        font-size: 0.9em;
      }
    </style>

    ${collection.render(
      'div',
      (i) => i.attrs({ class: 'article' }),
      (item) => `
        <h3>${item.link(`/blog/${item.i.slug}`, item.i.title)}</h3>
        <time>${item.i.date}</time>
        <p>${item.i.description}</p>
      `,
    )}
  `
}
