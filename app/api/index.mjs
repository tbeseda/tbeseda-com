import standardMiddleware from '../middleware/common.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '😵', hCards = [] }) {
	console.log('GET /')
	return {
		json: {
			icon,
			hCards,
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
