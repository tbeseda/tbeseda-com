const { readdirSync } = require('node:fs')
const { join } = require('node:path')

const articlesPath = join(process.cwd(), 'app', '_md', 'articles')

function readFileTree(dirPath) {
	return readdirSync(dirPath, { withFileTypes: true }).map((entry) => {
		const path = join(dirPath, entry.name)
		return entry.isDirectory() ? readFileTree(path) : path
	})
}

module.exports = {
	sandbox: {
		async start() {
			console.log('Indexing articles...')
			const articlePaths = readFileTree(articlesPath).flat(Infinity)
			console.log(`Found ${articlePaths.length} articles`)
		},
		async watcher({ event, filename }) {
			if (filename.startsWith(articlesPath) && filename.endsWith('.md')) {
				console.log(
					`${event}: ${filename.replace(articlesPath, '')} changed.`,
					'Reindexing articles...',
				)
			}
		},
	},
}
