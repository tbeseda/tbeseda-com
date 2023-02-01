/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html }) {
	return html`
		<div>
			<span class="p-author hidden">Taylor Beseda</span>
			<my-h-card></my-h-card>
		</div>
	`
}
