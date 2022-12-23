import standardMiddleware from '../middleware/standard.mjs'
const HANDLE = 'tbeseda'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler(req) {
	const iwSocialReq = await fetch(`https://indieweb.social/@${HANDLE}.json`)
	const iwSocialRes = await iwSocialReq.json()
	const iwSocialOutbox = await fetch(`${iwSocialRes.outbox}?page=true`)
	const iwSocialOutboxRes = await iwSocialOutbox.json()

	return {
		json: {
			// @ts-ignore
			icon: req.state.icon || '😵',
			// @ts-ignore
			hCards: req.state.hCards,
			iwSocialMe: iwSocialRes,
			iwSocialOutbox: iwSocialOutboxRes,
		},
	}
}

export const get = [...standardMiddleware, getHandler]
