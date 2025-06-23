import { renderContent } from '../../lib/sanity-content-renderer.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function BlogArticle({ html, state: { store } }) {
  const { article, queryTime, timers } = store

  const { narrationEnabled, narration } = article

  timers.start('article-render', 'tb-article-render')
  const rendered = renderContent(article.content)
  const renderTime = timers.stop('article-render') || 0

  const totalTime = queryTime + renderTime

  return html`
    <article>
      <time datetime=${article.publishedAt}>${new Date(article.publishedAt).toLocaleDateString()}</time>
      <h2>${article.title}</h2>

      ${
        narrationEnabled && narration?.asset?.url
          ? /*html*/ `
        <div>
          <audio controls>
            <source src="${narration.asset.url}" type="${narration.asset.mimeType || 'audio/mpeg'}">
            Your browser does not support the audio element.
          </audio>
        </div>`
          : ''
      }

      ${rendered}

      <p style="text-align: right;">
        <small>
          from Sanity.io (${queryTime.toFixed(2)}ms)
          to HTML (${renderTime.toFixed(2)}ms)
          <!-- in ${`${totalTime.toFixed(2)}`}ms -->
        </small>
      </p>
    </article>
  `
}
