/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbQuote({ html, state: { attrs } }) {
	return html`
		<blockquote>
			<slot></slot>
			<figcaption>${attrs.citation}</figcaption>
		</blockquote>
	`
}
