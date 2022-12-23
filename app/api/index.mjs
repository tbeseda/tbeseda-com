import standardMiddleware from '../middleware/standard.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler(req) {
	return {
		json: {
			// @ts-ignore
			icon: req.state.icon || '😵',
			// @ts-ignore
			hCards: req.state.hCards,
			links: [
				{
					url: 'github.com/tbeseda',
					description: 'Public and open source work.',
				},
				{
					url: 'indieweb.social/@tbeseda',
					description: 'In the Fediverse on Mastodon.',
				},
				{
					url: 'dev.to/tbeseda',
					description: 'Technical docs, snippets, and guides.',
				},
			],
		},
	}
}

export const get = [...standardMiddleware, getHandler]
