import arc from '@architect/functions'
import { createID } from '../../lib/create-id.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get({ query, session }) {
	let { authorized } = session
	authorized = !!authorized

	if (!authorized)
		return {
			status: 401,
			json: { error: 'Unauthorized' },
		}

	const { articles } = await arc.tables()
	const { articleID } = query
	let article
	if (articleID) article = await articles.get({ articleID })

	const result = await articles.scan({})
	const articlesList = result.Items

	return {
		json: { authorized, article, articles: articlesList },
	}
}

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function post({ body, session }) {
	let { authorized } = session
	authorized = !!authorized

	if (!authorized)
		return {
			status: 401,
			json: { error: 'Unauthorized' },
		}

	const { articles } = await arc.tables()
	const {
		action,
		articleID,
		content,
		date,
		description,
		published,
		slug,
		title,
	} = body

	if (action === 'destroy') {
		await articles.delete({ articleID })
	} else {
		const article = {
			articleID: articleID || createID(),
			doc: JSON.parse(content),
			date,
			description,
			published: !!published,
			slug,
			title,
		}

		await articles.put(article)
	}

	return {
		status: 302,
		headers: { location: '/sekret/blog' },
	}
}
