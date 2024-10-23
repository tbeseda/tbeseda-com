/** @type {import('@enhance/types').EnhanceElemFn} */
export default function Blob({ html, state }) {
  const {
    store: { string },
  } = state

  let isJson = false
  try {
    JSON.parse(string)
    isJson = true
  } catch (err) {
    isJson = false
  }

  return html`<pre>${isJson ? JSON.stringify(JSON.parse(string), null, 2) : string}</pre>`
}
