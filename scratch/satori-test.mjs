import fs from 'node:fs'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const fontLocation = new URL('./Roboto-Bold.ttf', import.meta.url)

const svg = await satori(
  {
    type: 'div',
    children: [],
    key: null,
    props: {
      style: { color: 'black' },
      children: 'hello, world'
    }
  },
  {
    fonts: [
      {
        name: 'Roboto',
        data: fs.readFileSync(fontLocation.pathname),
      }
    ],
    height: 100,
    width: 300,
  }
)

const resvg = new Resvg(svg)
const pngData = await resvg.render()
const pngBuffer = pngData.asPng()

fs.writeFileSync(new URL('satori.png', import.meta.url), pngBuffer)
