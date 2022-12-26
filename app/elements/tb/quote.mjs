/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbQuote({ html, state: { attrs } }) {
	return html`
		<blockquote class="font-serif text-center text1 leading1">
			<slot></slot>
			<figcaption class="mt-1 text0 font-sans">${attrs.citation}</figcaption>
		</blockquote>
	`
}
