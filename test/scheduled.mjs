import 'dotenv/config'
import test from 'node:test'
import assert from 'node:assert/strict'
import sandbox from '@architect/sandbox'

test('sandbox', async () => {
  await sandbox.start({ quiet: true })
  assert.ok(true)
})

test('scheduled', async () => {
  const { handler: tomorrowIo } = await import('../src/scheduled/tomorrow-io-update/index.mjs')
  await tomorrowIo()
  assert.ok(true)
})

test('sandbox', async () => {
  await sandbox.end()
  assert.ok(true)
  process.exit()
})
