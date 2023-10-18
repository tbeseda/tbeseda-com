import { Collection } from 'waylon'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function BlogList ({ html, state: { store } }) {
  const { articles = [] } = store
  const collection = new Collection(articles)
  return html`
    <style>
      :host {
        display: block;
      }
      .article {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }
      .article * {
        margin: 0;
      }
      .article a {
        font-size: 1.75rem;
        font-weight: 600;
      }
      .article time {
        font-size: 0.8em;
        margin-bottom: 0.5rem;
      }
    </style>

    <c-grid>
      ${collection.render(
        'div',
        (i) => i.attrs({ class: 'article' }),
        (item) => `
          ${item.link(`/blog/${item.i.slug}`, item.i.title)}
          <time>${item.i.date}</time>
          <p>${item.i.description}</p>
        `
      )}
    </c-grid>
  `
}
