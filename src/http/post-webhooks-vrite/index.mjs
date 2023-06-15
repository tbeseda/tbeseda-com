import arc from '@architect/functions'

const { VRITE_KEY } = process.env
const { things } = await arc.tables()

export async function handler({ body }) {
	const json = JSON.parse(body)
	const { id } = json

	console.log(`Content id: ${id}`)

	if (!VRITE_KEY) throw new Error('Missing Vrite key')

	const URL = [
		'https://api.vrite.io/content-pieces',
		'?content=true&description=text&id=',
		id,
	]

	const response = await fetch(URL.join(''), {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${VRITE_KEY}`,
		},
	})
	const content = await response.json()

	await things.put({
		key: `vrite:content:${content.id}`,
		...content,
	})

	return {
		statusCode: 200,
		body: 'tyvm',
	}
}
