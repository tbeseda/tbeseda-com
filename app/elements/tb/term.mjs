/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbTerm({ html, state: { store } }) {
	const { userIp } = store

	return html`
		<link rel="stylesheet" href="/_public/bundles/xterm.css">

		<tb-xterm></tb-xterm>

		<script type="module">
			import { SimpleXterm } from '/_public/browser/simple-xterm.mjs'

			class TbTerm extends HTMLElement {
				constructor() {
					super()

					this.term = new SimpleXterm({
						prompt: '${userIp}' + '@\x1B[1;3;31mtbeseda.com\x1B[0m > ',
						elem: this.querySelector('tb-xterm'),
					})
				}
				connectedCallback() {
					this.term.init()
				}
			}

			customElements.define('tb-term', TbTerm)
		</script>
	`
}
