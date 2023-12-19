import 'dotenv/config'
import test from 'node:test'
import assert from 'node:assert/strict'
import sandbox from '@architect/sandbox'

test('sandbox start', async () => {
  const started = await sandbox.start({ quiet: true })
  assert.ok(started)
})

test('scheduled', async () => {
  const { handler: tomorrowIo } = await import('../src/scheduled/tomorrow-io-update/index.mjs')
  const tomorrowIoResults = await tomorrowIo()
  console.log('tomorrowIoResults', tomorrowIoResults)
  assert.ok(tomorrowIoResults)

  const { handler: aqiUpdate } = await import('../src/scheduled/aqi-update/index.mjs')
  const aqiResults = await aqiUpdate()
  console.log('aqiResults', aqiResults)
  assert.ok(aqiResults)
})

test('sandbox end', async () => {
  const ended = await sandbox.end()
  assert.ok(ended)
})
