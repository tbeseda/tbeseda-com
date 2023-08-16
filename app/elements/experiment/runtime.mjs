/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentRuntime({ html, state: { attrs } }) {
	const { lang } = attrs
	return html`
		<style>
			:host {
				display: block;
			}
		</style>

		<h3>${lang}:</h3>

		<script type="module">
			class ExperimentRuntime extends HTMLElement {
				lang
				constructor() {
					super()
					this.lang = this.getAttribute('lang')
				}

				async render() {
					let string = 'unavailable'
					try {
						const response = await fetch(['/test', this.lang].join('/'))
						const data = await response.json()
						string = JSON.stringify(data)
					} catch (err) {
						console.error(err)
					}
					this.append(string)
				}

				connectedCallback() {
					this.render()
				}
			}

			customElements.define('experiment-runtime', ExperimentRuntime)
		</script>
	`
}
