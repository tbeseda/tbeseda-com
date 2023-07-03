import crypto from 'node:crypto'
import arc from '@architect/functions'
import standardMiddleware from '../middleware/common.mjs'

const { articles } = await arc.tables()

/**
 * @description Create uppercase alphanumeric ID
 * @param {number} length
 * @returns {string}
 */
function createID(length = 8) {
	return crypto
		.randomBytes(length / 2)
		.toString('hex')
		.toUpperCase()
}

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '😵', hCards = [] }) {
	return {
		json: { icon, hCards, articles: (await articles.scan({})).Items },
	}
}

export const get = [...standardMiddleware, getHandler]

/** @type {import('@enhance/types').EnhanceApiFn}*/
export async function post({ body }) {
	const { content, date, description, published, slug, title } = body
	const article = {
		articleID: createID(),
		content,
		date,
		description,
		published: !!published,
		slug,
		title,
		ttl: Math.floor(Date.now() / 1000) + 60 * 15,
	}

	const newArticle = await articles.put(article)
	console.log(newArticle)

	return {
		status: 302,
		headers: { location: '/editor' },
	}
}
