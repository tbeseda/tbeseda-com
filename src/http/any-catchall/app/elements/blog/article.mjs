import HeaderTimers from 'header-timers'
import { renderer } from '../../lib/pm2html-renderer.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function BlogArticle ({ html, state: { store } }) {
  const { article, queryTime } = store
  const timers = HeaderTimers()

  timers.start('article-render', 'tb-article-render')
  const rendered = renderer.render(article.doc)
  const renderTime = timers.stop('article-render') || 0
  const totalTime = queryTime + renderTime

  return html`
    <article>
      <time>${article.date}</time>
      <h2 class="title">${article.title}</h2>

      ${rendered}

      <p class="feature" style="text-align: right;">
        <small>
          from DynamoDB (${queryTime.toPrecision(2).toString()}ms)
          to HTML (${renderTime?.toPrecision(2).toString()}ms)
          in ${`${totalTime.toPrecision(2).toString()}`}ms
        </small>
      </p>
    </article>
  `
}
