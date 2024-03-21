import fs from 'node:fs'
import arc from '@architect/functions'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'

const fontLocation = new URL('./Roboto-Bold.ttf', import.meta.url)

const svg = await satori(
  {
    type: 'div',
    children: [],
    key: null,
    props: {
      style: { color: 'black' },
      children: 'hello, world',
    },
  },
  {
    fonts: [
      {
        name: 'Roboto',
        data: fs.readFileSync(fontLocation.pathname),
      },
    ],
    height: 100,
    width: 300,
  },
)

const resvg = new Resvg(svg)
const pngData = await resvg.render()
const pngBuffer = pngData.asPng()

async function http({ pathParameters }) {
  const { slug } = pathParameters
  console.log('slug', slug)

  return {
    status: 200,
    compression: false,
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=86400',
    },
    body: pngBuffer,
  }
}

// @ts-ignore
export const handler = arc.http.async(http)
