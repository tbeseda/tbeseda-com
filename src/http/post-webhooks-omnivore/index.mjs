import arc from '@architect/functions'

const { things } = await arc.tables()
const typePrefix = 'omnivore'

async function http({ body }) {
	// search body for one of three keys: "label", "page", or "HIGHLIGHT"
	const entity = body.label || body.page || body.HIGHTLIGHT || body.highlight
	//                        in case the schema changes to lowercase ↑

	if (!entity || !entity.type) return { status: 200 }

	const type = entity.type.toLowerCase()
	const fullType = `${typePrefix}:${type}`

	entity.relatedId = entity.pageId || entity.articleId || entity.id
	//                        label            HIGHLIGHT           page

	delete entity.originalHtml // could be huge

	await things.put({
		key: `${fullType}:${entity.id}`,
		type: fullType,
		updatedAt: new Date().toISOString(),
		entity,
	})

	return {
		status: 200,
		text: 'tyvm',
	}
}

export const handler = arc.http(http)
