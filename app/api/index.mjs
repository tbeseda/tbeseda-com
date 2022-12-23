import randomIconMiddleWare from '../middleware/random-icon.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler(req) {
	return {
		json: {
			// @ts-ignore
			icon: req.state.icon || '😵',
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

export const get = [randomIconMiddleWare, getHandler]
