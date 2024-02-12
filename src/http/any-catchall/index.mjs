import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import arc from '@architect/functions'
import importTransform from '@enhance/import-transform'
import styleTransform from '@enhance/enhance-style-transform'

import { createRouter, htmlSkeleton, c } from 'enhance-app-core'

import head from './app/head.mjs'
import preflight from './app/preflight.mjs'

const debug = true

const thisDir = dirname(fileURLToPath(import.meta.url))
const router = createRouter({
  basePath: join(thisDir, 'app'),
  apiPath: 'api',
  pagesPath: 'pages',
  elementsPath: 'elements',
  componentsPath: 'components',
  ssrOptions: {
    scriptTransforms: [importTransform({ lookup: arc.static })],
    styleTransforms: [styleTransform],
  },
  state: {},
  head,
  debug,
})

if (debug) router.report()

async function http (req) {
  console.log(`${c.orange(req.method)} ${req.path}`)

  try {
    const moreState = await preflight({ req })
    const response = await router.routeAndRender(req, moreState)

    if (debug) {
      console.log(`
${c.pink('───')} ${c.orange('HTML')} 💀 ${c.pink('───────────────────')}
${htmlSkeleton(response?.html)}
${c.pink('──────────────────────────────')}
      `)
    }

    return response
  } catch (err) {
    return {
      statusCode: Number(err.message),
      html: await router.render(`
        <main>
          <h1>${err.message}</h1>
          <h2>${err.cause}</h2>
          <p>
            <pre>${err.stack}</pre>
          </p>
          <error-help></error-help>
        </main>
      `, { error: err }),
    }
  }
}

export const handler = arc.http(http)
