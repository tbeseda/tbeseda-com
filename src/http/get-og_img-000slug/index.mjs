import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import arc from '@architect/functions'
import { Resvg, initWasm } from '@resvg/resvg-wasm'
import satori from 'satori'
import { createMarkup } from './article-og-img.mjs'
import process from 'node:process'
import { createClient } from '@sanity/client'

const { SANITY_PROJECT_ID } = process.env

if (!SANITY_PROJECT_ID) throw 'Missing SANITY_PROJECT_ID'

const client = createClient({
  projectId: SANITY_PROJECT_ID, // This doesn't need to be secret
  dataset: 'production',
  apiVersion: '2024-09-12', // use current date (YYYY-MM-DD) to target the latest API version
  perspective: 'published', // ensures Sanity "draft."s are not included
  useCdn: true, // use caching and edge
})

await initWasm(fs.readFileSync('./node_modules/@resvg/resvg-wasm/index_bg.wasm'))

async function get({ pathParameters }) {
  const { slug } = pathParameters
  const query = `*[_type == 'article' && slug.current == $slug] [0] {
    title, slug, publishedAt, description,
  }`
  const article = await client.fetch(query, { slug })

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
