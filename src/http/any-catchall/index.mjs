import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import arc from '@architect/functions'
import styleTransform from '@enhance/enhance-style-transform'
import importTransform from '@enhance/import-transform'

import enhanceApp from '@enhance/app-core'
import enhanceConfigLoader from '@enhance/app-loader'
import { mergeTimingHeaders } from '@enhance/arc-plugin-enhance/src/http/any-catchall/util.mjs'
import skelly from 'html-skelly'

import head from './app/head.mjs'
import preflight from './app/preflight.mjs'
import fingerprintPaths from './fingerprint-paths.mjs'

const debug = 0

const here = dirname(fileURLToPath(import.meta.url))
const config = await enhanceConfigLoader({
  basePath: join(here, 'app'),
  debug: debug > 1,
})
const app = enhanceApp({
  ...config,
  ssrOptions: {
    scriptTransforms: [importTransform({ lookup: arc.static })],
    styleTransforms: [styleTransform],
  },
  state: {},
  head,
  debug: debug > 1,
})

if (debug > 0) app.report()

async function http(req) {
  try {
    const moreState = await preflight({ req })
    const response = await app.routeAndRender(req, moreState)

    let { html, headers } = response

    html = fingerprintPaths(html)
    headers = mergeTimingHeaders(headers, config.timers)

    if (debug > 0) console.log(skelly('HTML', html))

    return { ...response, html, headers }
  } catch (err) {
    console.error(err)
    return {
      statusCode: Number(err.message),
      html: await app.render(
        `
        <main>
          <h1>${err.message}</h1>
          ${err.cause && `<h2>${err.cause}</h2>`}
          <p>
            <pre>${err.stack}</pre>
          </p>
          <error-help></error-help>
        </main>
      `,
        { error: err },
      ),
    }
  }
}

export const handler = arc.http(http)
