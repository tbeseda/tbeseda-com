// TODO: use ESM
// TODO: use tape
const { after, before, describe, it } = require('node:test')
const assert = require('node:assert/strict')

const { mf2 } = require('microformats-parser')
const sandbox = require('@architect/sandbox')

const PORT = 6661
const URL = `http://localhost:${PORT}`

describe('smoke and microformats', async (t) => {
	let parsedHCard

	before(async () => {
		await sandbox.start({
			quiet: true,
			port: PORT,
		})
		console.log('Sandbox started')
	})

	after(async () => {
		await sandbox.end()
		console.log('Sandbox ended')
	})

	it('fetches key routes', async () => {
		for (const route of [
			URL,
			`${URL}/articles`,
			`${URL}/articles/2022/12/hello-world`,
			`${URL}/articles/rss`,
			`${URL}/toot`,
			`${URL}/h-card`,
		]) {
			try {
				const res = await fetch(route)
				assert.ok(
					res.ok,
					`Route ${route} returned status ${res.status} instead of 200 OK`,
				)
			} catch (error) {
				assert.fail(`Route ${route} failed with error: ${error.message}`)
			}
		}
	})

	it('fetches the index and parses an h-card', async () => {
		const res = await fetch(`${URL}/h-card`)
		const body = await res.text()
		const parsed = mf2(body, { baseUrl: URL })
		parsedHCard = parsed.items[0]

		assert.equal(parsedHCard.type?.[0], 'h-card', 'h-card is an h-card')
	})

	it('matches original h-card data', async () => {
		const { default: myHCardData } = await import(
			'../app/middleware/add-h-cards.mjs'
		)
		const fakeReq = {}
		await myHCardData(fakeReq)
		const {
			state: { hCards: { items: [myHCard] } },
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
				`"${key}" mismatch: ${hCardVal} !== ${myHCardVal}`,
			)
		}
	})
})
