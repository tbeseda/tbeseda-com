// inspired by https://muxup.com/2022q3/muxup-implementation-notes#footer-images
// data from https://github.com/googlecreativelab/quickdraw-dataset
// prior art: https://github.com/googlecreativelab/quickdraw-component/blob/master/quickdraw-component.js

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentSkull ({ html }) {
  return html`
    <style>
      :host {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
      }
    </style>

    <h1>Random Skull</h1>
    <p>
    Use canvas to draw a skull from the <a href="https://quickdraw.withgoogle.com/data" target="_blank">Quick, Draw!</a> dataset.<br>
    Read <a href="https://tbeseda.com/blog/get-a-random-record-from-json">the blog post here</a>.
    </p>
    <code></code>
    <canvas width="256" height="256"></canvas>
    <button>Another one!</button>

    <details>
      <summary>Raw Data</summary>
      <pre></pre>
    </details>

    <script>
      class ExperimentSkull extends HTMLElement {
        constructor() {
          super()
          this.canvas = this.querySelector('canvas')
          this.code = this.querySelector('code')
          this.button = this.querySelector('button')
          this.pre = this.querySelector('pre')
        }

        connectedCallback() {
          this.fetchSkull()
          this.button.addEventListener('click', this.fetchSkull.bind(this))
        }

        async fetchSkull() {
          const response = await fetch('/api/skull')
          const skull = await response.json()
          this.skull = skull
          this.code.textContent = skull.key_id
          this.pre.textContent = JSON.stringify(skull, null, 2)
          this.drawSkull(skull)
        }

        async drawSkull(skull) {
          const { drawing } = skull
          const ctx = this.canvas.getContext('2d')

          // reset canvas
          ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          ctx.fillStyle = '#f8f8f8'
          ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

          ctx.strokeStyle = 'black'
          ctx.lineWidth = 1
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.beginPath()

          for (const [xPts, yPts] of drawing) {
            for (let i = 0; i < xPts.length; i++) {
              const x = xPts[i]
              const y = yPts[i]
              if (i === 0) {
                ctx.moveTo(x, y)
              } else {
                ctx.lineTo(x, y)
              }
            }
          }

          ctx.stroke()
        }
      }

      customElements.define('experiment-skull', ExperimentSkull)
    </script>
  `
}
