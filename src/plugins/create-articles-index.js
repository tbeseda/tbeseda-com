const { readdirSync, readFileSync, writeFileSync } = require('node:fs')
const { join } = require('node:path')

const articlesPath = join(process.cwd(), 'app', '_md', 'articles')

function readFileTree(dirPath) {
	return readdirSync(dirPath, { withFileTypes: true })
		.map((entry) => {
			const path = join(dirPath, entry.name)
			return entry.isDirectory() ? readFileTree(path) : path
		})
		.flat(Infinity)
}

async function parseArticles(articlePaths) {
	const { Arcdown } = await import('arcdown')
	const arcdown = new Arcdown({})

	return await Promise.all(
		articlePaths.map(async (path) => {
			const file = readFileSync(path, 'utf8')
			return {
				filepath: path,
				path: path.replace(articlesPath, '/articles').replace('.md', ''),
				filename: path.split('/').at(-1).replace('.md', ''),
				result: await arcdown.render(file),
			}
		}),
	)
}

async function createIndex({ onlyPublished = false } = {}) {
	console.log('Indexing articles...')
	const articlePaths = readFileTree(articlesPath)
	console.log(`Found ${articlePaths.length} articles.`)

	const articles = await parseArticles(articlePaths)
	console.log(`Parsed ${articles.length} articles.`)
	console.log(articles.map((article) => article.path))

	writeFileSync(
		`${process.cwd()}/app/_data/articles.json`,
		JSON.stringify(articles),
	)
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
