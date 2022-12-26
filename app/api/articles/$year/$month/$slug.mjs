import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import { URL } from 'node:url'
import { Arcdown } from 'arcdown'
import standardMiddleware from '../../../../middleware/common.mjs'

class HljsLineWrapper {
	constructor(options) {
		this.className = options.className
	}

	'after:highlight'(result) {
		const tokens = []

		const safelyTagged = result.value.replace(
			/(<span [^>]+>)|(<\/span>)|(\n)/g,
			(match) => {
				if (match === '\n') {
					return `${'</span>'.repeat(tokens.length)}\n${tokens.join('')}`
				}

				if (match === '</span>') {
					tokens.pop()
				} else {
					tokens.push(match)
				}

				return match
			},
		)

		result.value = safelyTagged
			.split('\n')
			.reduce((result, line, index, lines) => {
				const lastLine = index + 1 === lines.length
				if (!(lastLine && line.length === 0)) {
					result.push(
						`<span class="${this.className || 'hljs-line'}">${line}</span>`,
					)
				}
				return result
			}, [])
			.join('\n')
	}
}

const arcdown = new Arcdown({
	pluginOverrides: {
		markdownItToc: {
			containerClass: 'toc mb2 ml-2',
			listType: 'ul',
		},
	},
	plugins: [],
	hljs: {
		sublanguages: { javascript: ['xml', 'css'] },
		plugins: [new HljsLineWrapper({ className: 'line' })],
	},
})

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ params, ...req }) {
	const { year, month, slug } = params

	const path = `../../../../_md/articles/${year}/${month}/${slug}.md`
	const articleFilePath = new URL(join(...path.split('/')), import.meta.url)

	const articleMd = readFileSync(articleFilePath.pathname, 'utf-8')
	const article = await arcdown.render(articleMd)

	const cacheControl = process.env.ARC_SANDBOX
		? 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
		: 'max-age=3600;'

	return {
		cacheControl,
		json: {
			icon: req.state.icon || '😵',
			hCards: req.state.hCards,
			article: {
				path: { year, month, slug },
				...article,
				...article.frontmatter,
			},
		},
	}
}

export const get = [...standardMiddleware, getHandler]
