import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import arc from '@architect/functions'
import styleTransform from '@enhance/enhance-style-transform'
import importTransform from '@enhance/import-transform'

import enhanceApp from '@enhance/core'
import enhanceConfigLoader from '@enhance/loader'
import skelly from 'html-skelly'

import head from './app/head.mjs'
import preflight from './app/preflight.mjs'
import fingerprintPaths from './fingerprint-paths.mjs'

const debug = 0
const useElementsCache = false
const ELEMENTS = 'elements.json'
const here = dirname(fileURLToPath(import.meta.url))
const loaderConfig = {
  basePath: join(here, 'app'),
  debug: debug > 1,
}

let elements
if (useElementsCache && existsSync(join(here, ELEMENTS))) {
  const loaded = readFileSync(join(here, 'elements.json'), 'utf8')

  elements = JSON.parse(loaded, (key, value) => {
    if (typeof value === 'string' && value.startsWith('function')) {
      return eval(`(${value})`)
    }
    return value
  })

  loaderConfig.elementsPath = 'elements.empty'
}

const { routes, elements: configElements, timers } = await enhanceConfigLoader(loaderConfig)
const app = enhanceApp({
  routes: routes,
  elements: elements || configElements,
  ssrOptions: {
    scriptTransforms: [importTransform({ lookup: arc.static })],
    styleTransforms: [styleTransform],
  },
  state: {},
  head,
  debug: debug > 1,
})

if (useElementsCache && !elements && configElements) {
  const bundledElements = JSON.stringify(configElements, (key, value) =>
    typeof value === 'function' ? value.toString() : value,
  )
  writeFileSync(join(here, ELEMENTS), bundledElements, 'utf8')
}

if (debug > 0) app.report()

async function http(req) {
  try {
    const moreState = await preflight({ req })
    const response = await app.routeAndRender(req, moreState)

    let { html, headers } = response

    html = fingerprintPaths(html)
    // headers = mergeTimingHeaders(headers, timers)

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
