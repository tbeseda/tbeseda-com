/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentTerm({ html, state: { store } }) {
	const { userIp } = store

	return html`
		<link rel="stylesheet" href="/_public/bundles/xterm.css">

		<tb-xterm></tb-xterm>

		<script type="module">
			import { SimpleXterm } from '/_public/browser/simple-xterm.mjs'

			class ExperimentTerm extends HTMLElement {
				constructor() {
					super()

					this.term = new SimpleXterm({
						user: '${userIp}',
						host: 'tbeseda.com',
						symbol: '> ',
						elem: this.querySelector('tb-xterm'),
					})
				}

				connectedCallback() {
					const commands = {
						help() {
							return ['Available commands:', ...Object.keys(this)]
						},
						ls() {
							return ['index.html', 'index.js', 'index.css']
						},
						whoami() {
							return ['${userIp}']
						},
						pwd() {
							return [window.location.pathname]
						},
						nick: ({ args }) => {
							if (args.length === 0) return ['nick: missing new nickname']
							this.term.setUser(args[0])
							return ['Changed nick to ' + args[0]]
						}
					}
					this.term.init(commands)
				}
			}

			customElements.define('experiment-term', ExperimentTerm)
		</script>
	`
}
