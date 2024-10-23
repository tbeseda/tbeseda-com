import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))

const loaded = readFileSync(join(here, 'elements.json'), 'utf8')

const deserialized = JSON.parse(loaded, (key, value) => {
  if (typeof value === 'string' && value.startsWith('function')) {
    return eval(`(${value})`)
  }
  return value
})

console.log(deserialized)
