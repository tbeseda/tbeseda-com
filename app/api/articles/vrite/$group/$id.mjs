import arc from '@architect/functions'
import standardMiddleware from '../../../../middleware/common.mjs'

const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '😵', hCards = [], params }) {
	const { group, id } = params

	const content = await things.get({ key: `content:${group}:${id}` })

	return {
		json: { icon, hCards, content },
	}
}

export const get = [...standardMiddleware, getHandler]
