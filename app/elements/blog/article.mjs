import HeaderTimers from 'header-timers'
import { renderer } from '../../lib/pm2html-renderer.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function BlogArticle ({ html, state: { store } }) {
  const { article, queryTime } = store
  const timers = HeaderTimers()

  timers.start('render', 'tb-article-render')
  const rendered = renderer.render(article.doc)
  const renderTime = timers.stop('render') || 0
  const totalTime = queryTime + renderTime

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
      <div class="card">${rendered}</div>
      <p style="text-align: right;">
        <small>from DynamoDB (${queryTime.toPrecision(2).toString()}ms) to HTML (${renderTime?.toPrecision(2).toString()}ms) in ${`${totalTime}`}ms</small>
      </p>
    </article>
  `
}
