import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { env } from 'node:process'
import { fileURLToPath } from 'node:url'

const isTesting = env.ARC_ENV === 'testing'

const thisDir = dirname(fileURLToPath(import.meta.url))
const staticPath = join(thisDir, 'node_modules', '@architect', 'shared', 'static.json')

let staticMapped // chache

export function fingerprintPublicRefs (str) {
  if (!str) return
  if (isTesting) return str

  if (!staticMapped) {
    let staticJson = {}
    try {
      staticJson = JSON.parse(readFileSync(staticPath).toString())
    } catch (e) {
      console.error('Static manifest parsing error', e)
      return str // good luck 🫡
    }

    staticMapped = {}
    Object.entries(staticJson).forEach(file => {
      staticMapped[`_public/${file[0]}`] = `_public/${file[1]}`
    })
  }

  return replaceEvery(str, staticMapped)
}

function replaceEvery (str, staticMapped) {
  const re = new RegExp(
    Object.keys(staticMapped)
      .sort()
      .reverse()
      .map(i => escapeRegExp(i)).join('|'), 'gi',
  )

  return str.replace(re, (matched) => staticMapped[matched])
}

function escapeRegExp (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
