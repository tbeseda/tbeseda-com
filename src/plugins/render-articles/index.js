const { readdirSync, readFileSync, writeFileSync } = require('node:fs')
const { join } = require('node:path')
const { createArcdown } = require('./renderer')

const articlesPath = join(process.cwd(), 'markdown', 'articles')

function readFileTree(dirPath) {
	return readdirSync(dirPath, { withFileTypes: true })
		.map((entry) => {
			const path = join(dirPath, entry.name)
			return entry.isDirectory() ? readFileTree(path) : path
		})
		.flat(Infinity)
}

async function parseArticles(articlePaths) {
	const arcdown = await createArcdown()

	return await Promise.all(
		articlePaths.map(async (path) => {
			const file = readFileSync(path, 'utf8')
			const result = await arcdown.render(file)
			return {
				path: path.replace(articlesPath, '/articles').replace('.md', ''),
				...result,
				...result.frontmatter,
			}
		}),
	)
}

async function createIndex({ onlyPublished = false } = {}) {
	console.log('Indexing articles...')

	const articlePaths = readFileTree(articlesPath)
	let articles = await parseArticles(articlePaths)

	console.log(`Parsed ${articles.length} articles.`)

	articles = onlyPublished ? articles.filter((a) => a.published) : articles

	articles.sort((a, b) => {
		const aPub = a.published
		const bPub = b.published
		return bPub?.localeCompare(aPub) || 1
	})

	writeFileSync(
		`${process.cwd()}/app/_data/articles.json`,
		JSON.stringify(articles),
	)
	console.log(`Index created for ${articles.length} articles.`)
}

module.exports = {
	sandbox: {
		async start() {
			await createIndex({ onlyPublished: false })
		},

		async watcher({ event, filename }) {
			if (filename.startsWith(articlesPath) && filename.endsWith('.md')) {
				console.log(
					`${event}: ${filename.replace(articlesPath, '')} changed.`,
					'Reindexing articles...',
				)

				await createIndex()
			}
		},
	},
	deploy: {
		async start() {
			await createIndex({ onlyPublished: true })
		},
	},
}
