import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import arc from '@architect/functions'
import importTransform from '@enhance/import-transform'
import styleTransform from '@enhance/enhance-style-transform'

import { createRouter, htmlSkeleton, c } from 'enhance-app-core'
// import { createRouter, htmlSkeleton, c } from './enhance-app-core/src/index.js'

import head from './app/head.mjs'
import preflight from './app/preflight.mjs'

const debug = 0

const thisDir = dirname(fileURLToPath(import.meta.url))
const router = createRouter({
  basePath: join(thisDir, 'app'),
  apiPath: '/api',
  pagesPath: '/pages',
  elementsPath: '/elements',
  componentsPath: '/components',
  ssrOptions: {
    scriptTransforms: [importTransform({ lookup: arc.static })],
    styleTransforms: [styleTransform],
  },
  state: {},
  head,
  debug: debug > 0,
})

if (debug > 1) router.report()

async function http (req) {
  try {
    const moreState = await preflight({ req })
    const response = await router.routeAndRender(req, moreState)

    if (debug > 1) {
      console.log(`
${c.pink('───')} ${c.orange('HTML')} 💀 ${c.pink('───────────────────')}
${htmlSkeleton(response?.html)}
${c.pink('──────────────────────────────')}
      `)
    }

    return response
  } catch (err) {
    console.error(err)
    return {
      statusCode: Number(err.message),
      html: await router.render(`
        <main>
          <h1>${err.message}</h1>
          ${err.cause && `<h2>${err.cause}</h2>`}
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
