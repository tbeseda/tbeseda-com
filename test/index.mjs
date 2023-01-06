import test from 'tape'
import { mf2 } from 'microformats-parser'
import sandbox from '@architect/sandbox'

const PORT = 6661
const URL = `http://localhost:${PORT}`

async function before() {
	await sandbox.start({
		quiet: true,
		port: PORT,
	})
	console.log('Sandbox started')
}

test.onFinish(async () => {
	await sandbox.end()
	console.log('Sandbox ended')
})

test('smoke and microformats', async (t) => {
	await before()

	let parsedHCard

	t.test('fetches key routes', async (st) => {
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
				st.ok(
					res.ok,
					`Route ${route} returned status ${res.status} instead of 200 OK`,
				)
			} catch (error) {
				st.fail(`Route ${route} failed with error: ${error.message}`)
			}
		}
	})

	t.test('fetches the index and parses an h-card', async (st) => {
		const res = await fetch(`${URL}/h-card`)
		const body = await res.text()
		const parsed = mf2(body, { baseUrl: URL })
		parsedHCard = parsed.items[0]

		st.equal(parsedHCard.type?.[0], 'h-card', 'h-card is an h-card')
	})

	t.test('matches original h-card data', async (st) => {
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

			st.equal(
				hCardVal,
				myHCardVal,
				`"${key}" mismatch: ${hCardVal} !== ${myHCardVal}`,
			)
		}
	})
})
