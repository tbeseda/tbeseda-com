import arc from '@architect/functions'
import standardMiddleware from '../../../middleware/common.mjs'

const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '😵', hCards = [], params }) {
	const { id } = params

	if (!id) throw new Error('Missing id')

	const content = await things.get({ key: `vrite:content:${id}` })

	return {
		json: { icon, hCards, content },
	}
}

export const get = [...standardMiddleware, getHandler]
