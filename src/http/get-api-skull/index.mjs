// Get a random skull from 126,174 skull drawings

import fs from 'node:fs'
import arc from '@architect/functions'

const filePath = './skulls.ndjson' // 1 skull per line
const stats = fs.statSync(filePath) // file size is static

export const handler = arc.http(getRandomSkull)

async function getRandomSkull () {
  // pick a random position in the file
  const cursor = Math.floor(Math.random() * stats.size)
  const fileStream = fs.createReadStream(filePath, {
    start: cursor, // start is likely mid-line
    end: cursor + 2000, // line is typically ~1kb, grab ~2
    encoding: 'utf8',
  })

  // collect the full length of 2kb
  let chonks = ''
  for await (const chonk of fileStream) chonks += chonk

  // find the first and second newlines
  const n1 = chonks.indexOf('\n')
  const n2 = chonks.indexOf('\n', n1 + 1)

  // TODO: retry
  // ! we hit the very unlikely case setting the cursor to the last line
  if (n1 < 0 || n2 < 0) return { statusCode: 500, body: 'Oops. 💀' }

  // grab the line of JSON
  const line = chonks.slice(n1 + 1, n2)

  let skullJson = {}
  try {
    skullJson = JSON.parse(line)
    return { json: skullJson }
  } catch (error) {
    return {
      statusCode: 500,
      json: { error, line, message: 'Failed to parse JSON' },
    }
  }
}
