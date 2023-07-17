/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentSkull({ html }) {
	return html`
		<style>
			:host {
				display: block;
			}
		</style>

		<h1>Random Skull</h1>
		<canvas width="50" height="50"></canvas>

		<h2>Raw Data</h2>
		<pre></pre>

		<script>
			class ExperimentSkull extends HTMLElement {
				constructor() {
					super()
					this.canvas = this.querySelector('canvas')
					this.pre = this.querySelector('pre')
				}

				connectedCallback() {
					this.fetchSkull()
				}

				async fetchSkull() {
					const response = await fetch('/api/skull')
					const skull = await response.json()
					this.skull = skull
					this.pre.textContent = JSON.stringify(skull, null, 2)
					this.drawSkull(skull)
				}

				drawSkull(skull) {
					const { drawing } = skull
					const ctx = this.canvas.getContext('2d')
					ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
					ctx.fillStyle = 'white'
					ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
					ctx.strokeStyle = 'black'
					ctx.lineWidth = 1
					ctx.beginPath()
					// TODO: the thing
				}
			}

			customElements.define('experiment-skull', ExperimentSkull)
		</script>
	`
}
