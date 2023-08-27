import arc from '@architect/functions'

const { things } = await arc.tables()
const typeString = 'omnivore:unknown'

async function http({ body }) {
	console.log(body)

	await things.put({
		key: `${typeString}:${new Date().toISOString()}`,
		type: typeString,
		updatedAt: new Date().toISOString(),
		body,
	})

	return {
		statusCode: 200,
		text: 'tyvm',
	}
}

export const handler = arc.http(http)
