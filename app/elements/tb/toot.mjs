/** @type {import('@enhance/types').EnhanceElemFn} */
export default function Toot({ html, state: { store } }) {
	const { iwSocialMe, iwSocialOutbox } = store
	const recentItem = iwSocialOutbox.orderedItems.find(
		(item) =>
			item.type === 'Create' &&
			item.actor === iwSocialMe.id &&
			item.object.type === 'Note' &&
			item.object.inReplyTo === null &&
			item.object.content,
	)
	const recentToot = recentItem.object
	const imgAttachments = recentToot.attachment
		.filter((a) => a.mediaType.startsWith('image/'))
		.map((a) => `<img src="${a.url}" width="300px" alt="${a.name}" />`)

	return html`
    <div class="mb1 leading1 font-serif">${recentToot.content}</div>

    ${
			imgAttachments.length > 0
				? `<div class="grid flow-col justify-start gap0">${imgAttachments.join(
						'',
				  )}</div>`
				: ''
		}
  `
}
