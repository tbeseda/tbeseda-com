import { renderContent } from '../lib/sanity-content-renderer.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function CodeExperiment({ html, state: { store } }) {
  const { codeExperiment } = store
  const rendered = renderContent(codeExperiment.content)

  return html`

<article>
  <div>
    Published: <date>${codeExperiment.publishedAt}</date>
    ${codeExperiment.updatedAt ? `Updated: <date>${codeExperiment.updatedAt}</date>` : ''}
  </div>
  <h2>${codeExperiment.title}</h2>
  <h3>
    ${codeExperiment.excerpt}
    ${codeExperiment.isWIP ? '<mark>WIP</mark>' : ''}
  </h3>
  ${codeExperiment.path ? `<a href="${codeExperiment.path}">Live demo</a>` : ''}
  ${codeExperiment.technology ? `<p>Technology: ${codeExperiment.technology.join(', ')}</p>` : ''}

  ${rendered}
</article>

`
}
