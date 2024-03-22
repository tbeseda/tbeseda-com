import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import arc from '@architect/functions'
import { Resvg, initWasm } from '@resvg/resvg-wasm'
import satori from 'satori'
import { createMarkup } from './article-og-img.mjs'

await initWasm(fs.readFileSync('./node_modules/@resvg/resvg-wasm/index_bg.wasm'))

const { articles } = await arc.tables()

async function get({ pathParameters }) {
  const { slug } = pathParameters

  const query = await articles.query({
    IndexName: 'articlesBySlug',
    KeyConditionExpression: 'slug = :slug',
    ExpressionAttributeValues: { ':slug': slug },
  })
  const article = query.Items[0]

  if (!article) return { statusCode: 404 }

  const svg = await satori(createMarkup(article), {
    fonts: [
      {
        name: 'Roboto',
        weight: 400,
        data: fs.readFileSync(new URL('./Roboto-Regular.ttf', import.meta.url).pathname),
        style: 'normal',
      },
      {
        name: 'Roboto',
        weight: 700,
        data: fs.readFileSync(new URL('./Roboto-Bold.ttf', import.meta.url).pathname),
        style: 'normal',
      },
    ],
    height: 630,
    width: 1200,
  })

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  })
  const pngData = await resvg.render()
  const pngBuffer = pngData.asPng()

  return {
    statusCode: 200,
    compression: false,
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=86400',
    },
    body: Buffer.from(pngBuffer),
  }
}

// @ts-ignore
export const handler = arc.http.async(get)
