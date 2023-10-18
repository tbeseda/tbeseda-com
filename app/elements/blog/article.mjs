import { renderer } from '../../lib/pm2html-renderer.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function BlogArticle ({ html, state: { store } }) {
  const { article } = store

  return html`
    <style>
      :host > article {
        display: flex;
        flex-direction: column;
      }
      article > * {
        margin: 0;
      }
      article > div img {
        align-self: center;
        margin: 1.5rem auto;
        box-shadow: var(--shadow);
      }
    </style>

    <article>
      <h1>${article.title}</h1>
      <time>${article.date}</time>
      <div class="card">${renderer.render(article.doc)}</div>
    </article>
  `
}
