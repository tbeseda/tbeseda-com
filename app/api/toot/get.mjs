const MY_HANDLE = 'tbeseda'

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	const { handle } = req.query

	if (!handle || handle !== MY_HANDLE) {
		// gtfo
		return { status: 401, json: { error: 'Unauthorized' } }
	}

	const iwSocialReq = await fetch(`https://indieweb.social/@${handle}.json`)
	const iwSocialRes = await iwSocialReq.json()
	const iwSocialOutbox = await fetch(`${iwSocialRes.outbox}?page=true`)
	const iwSocialOutboxRes = await iwSocialOutbox.json()

	const recentItem = iwSocialOutboxRes.orderedItems.find(
		(item) =>
			item.type === 'Create' &&
			item.actor === iwSocialRes.id &&
			item.object.type === 'Note' &&
			item.object.inReplyTo === null &&
			item.object.content,
	)
	const recentToot = recentItem.object

	return {
		json: recentToot,
	}
}
