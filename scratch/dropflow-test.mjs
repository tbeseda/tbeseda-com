import fs from 'node:fs'
import { createCanvas } from 'canvas'
import * as flow from 'dropflow'

// Register fonts before layout. This is a required step.
// It is only async when you don't pass an ArrayBuffer
await flow.registerFont(new URL('./Roboto-Regular.ttf', import.meta.url))
await flow.registerFont(new URL('./Roboto-Bold.ttf', import.meta.url))

// Always create styles at the top-level of your module if you can
const divStyle = {
  backgroundColor: { r: 28, g: 10, b: 0, a: 1 },
  color: { r: 179, g: 200, b: 144, a: 1 },
  // textAlign: 'center',
}

// Since we're creating styles directly, colors have to be defined numerically
const spanStyle = {
  color: { r: 115, g: 169, b: 173, a: 1 },
  fontWeight: 700,
}

// Create a DOM
const rootElement = flow.h('div', { style: divStyle }, [
  'Hello, ',
  flow.h('span', { style: spanStyle }, ['World!']),
])

// Layout and paint into the entire canvas (see also renderToCanvasContext)
const canvas = createCanvas(250, 50)
flow.renderToCanvas(rootElement, canvas, /* optional density: */ 2)

// Save your image
canvas.createPNGStream().pipe(fs.createWriteStream(new URL('dropflow.png', import.meta.url)))
