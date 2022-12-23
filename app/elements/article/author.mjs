/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html }) {
	return html`
    <div class="p-author">
      <my-h-card></my-h-card>
    </div>
  `
}
