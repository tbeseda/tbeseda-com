import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import arc from '@architect/functions'
import { Resvg, initWasm } from '@resvg/resvg-wasm'
import satori from 'satori'

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

  console.log('article', article)

  const svg = await satori(
    {
      type: 'div',
      children: [],
      key: null,
      props: {
        style: {
          display: 'flex',
          'flex-direction': 'column',
          gap: '1rem',
          'justify-content': 'space-between',
          padding: '2.5rem',
          'background-color': '#202124',
          color: '#ccc',
          height: '100%',
          'font-size': '18px',
          'font-family': 'Roboto',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                margin: 0,
              },
              children: [
                {
                  type: 'h1',
                  props: {
                    style: {
                      margin: 0,
                      width: 'auto',
                      'background-color': '#fff',
                      color: '#333',
                      'font-size': '4rem',
                      'font-weight': 700,
                    },
                    children: article.title,
                  },
                },
              ],
            },
          },
          {
            type: 'p',
            props: {
              style: {
                'line-height': '1.25',
                'font-size': '2.5rem',
              },
              children: article.description,
            },
          },
          {
            type: 'small',
            props: {
              style: {
                color: '#aaa',
                'font-size': '2.5rem',
              },
              children: 'by Taylor Beseda',
            },
          },
          {
            type: 'small',
            props: {
              style: {
                color: '#5b5c5f',
                'font-size': '2rem',
              },
              children: `tbeseda.com/blog/${article.slug}`,
            },
          },
        ],
      },
    },
    {
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
    },
  )

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
