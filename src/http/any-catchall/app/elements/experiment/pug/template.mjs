import { renderFile } from 'pug'

const __dirname = new URL('.', import.meta.url).pathname

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentPugTemplate ({ html, state }) {
  return html`${renderFile(`${__dirname}/template.pug`, { state })}`
}
