/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbQuote({ html, state : { attrs } }) {
  return html`
    <blockquote class="mb3 font-serif text-center text2 leading1">
      <slot></slot>
      <figcaption class="mt-1 text0 font-sans">${attrs.citation}</figcaption>
    </blockquote>
  `
}
