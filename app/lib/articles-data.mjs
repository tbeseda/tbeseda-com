import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const today = new Date()
const here = dirname(fileURLToPath(import.meta.url))

const articles = JSON.parse(
	readFileSync(join(here, '..', '_data', 'articles.json'), 'utf8'),
)

export default process.env.ARC_SANDBOX
	? articles
	: articles.filter((a) => (a.published ? new Date(a.published) < today : true))

export function articleFromPath(path) {
	return articles.find((a) => a.path === path)
}
