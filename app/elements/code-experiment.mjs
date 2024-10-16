/** @type {import('@enhance/types').EnhanceElemFn} */
export default function CodeExperiment({ html, state: { store } }) {
  const { codeExperiment } = store
  console.log(codeExperiment)

  return html`

<date>${codeExperiment.publishedAt}</date>
<h2>${codeExperiment.title}</h2>
<h3>
  ${codeExperiment.excerpt}
  ${codeExperiment.isWIP ? '<mark>WIP</mark>' : ''}
</h3>
<p>${codeExperiment.content}</p>

  `
}
