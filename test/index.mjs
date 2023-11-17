import assert from 'node:assert/strict'
import test from 'node:test'
import sandbox from '@architect/sandbox'
import { mf2 } from 'microformats-parser'

const PORT = 6661
const URL = `http://localhost:${PORT}`

test('sandbox', async (t) => {
  await sandbox.start({
    quiet: true,
    port: PORT,
  })
  console.log('Sandbox started')
})

test('smoke and microformats', async (t) => {
  let parsedHCard

  await t.test('fetches key routes', async (st) => {
    for (const route of [
      URL,
      `${URL}/blog`,
      `${URL}/blog/gitclean-zsh-command`,
      `${URL}/blog/rss`,
      `${URL}/experiments`,
      `${URL}/h-card`,
    ]) {
      try {
        const res = await fetch(route)
        assert.ok(res.ok, `Route ${route} returned status ${res.status}`)
      } catch (error) {
        assert.fail(`Route ${route} failed with error: ${error.message}`)
      }
    }
  })

  await t.test('fetches the index and parses an h-card', async (st) => {
    const res = await fetch(`${URL}/h-card`)
    const body = await res.text()
    const parsed = mf2(body, { baseUrl: URL })
    parsedHCard = parsed.items[0]

    assert.equal(parsedHCard.type?.[0], 'h-card', 'h-card is an h-card')
  })

  await t.test('matches original h-card data', async (st) => {
    const { default: myHCardData } = await import(
      '../app/middleware/add-h-cards.mjs'
    )
    const fakeReq = {}
    await myHCardData(fakeReq)
    const {
      hCards: { items: [myHCard] },
    } = fakeReq

    for (const key of [
      'country-name',
      'email',
      'locality',
      'name',
      // 'nickname', // ?
      'org',
      // 'photo',
      'region',
      'role',
      'url',
    ]) {
      const hCardVal = parsedHCard.properties[key][0]
      const myHCardVal = myHCard.properties[key][0]

      assert.equal(
        hCardVal,
        myHCardVal,
        `"${key}" match: ${hCardVal} === ${myHCardVal}`,
      )
    }
  })
})

test('sandbox stop', async (t) => {
  await sandbox.end()
  console.log('Sandbox ended')
})
