import arc from '@architect/functions'
import { mf2 } from 'microformats-parser'

export const handler = arc.events.subscribe(async (webmentionReq) => {
	const { body, headers } = webmentionReq
	const { target, source } = body
	const targetUrl = new URL(target)
	const sourceUrl = new URL(source)

	const result = {
		id: `in:${targetUrl.pathname}:${sourceUrl.hostname}`,
		created: new Date().toISOString(),
		source,
		target,
		targetPath: targetUrl.pathname,
		request: { headers, body },
	}

	const sourceReq = await fetch(sourceUrl.href)
	if (sourceReq.ok) {
		const sourceBody = await sourceReq.text()

		// search body for target URL
		if (sourceBody.indexOf(targetUrl.href) > -1) {
			const { items } = mf2(sourceBody, { baseUrl: sourceUrl.href })
			const hentry = items.find((i) => i.type?.includes('h-entry'))
			// const hcard = items.find(i => i.type?.includes('h-card'))

			try {
				if (
					hentry?.properties?.author &&
					Array.isArray(hentry.properties.author)
				) {
					if (typeof hentry.properties.author[0] === 'string') {
						result.sourceAuthor = hentry.properties.author[0]
					} else if (hentry.properties.author[0].value) {
						result.sourceAuthor = hentry.properties.author[0].value
					}
				}
			} catch (error) {
				console.log(`error parsing source author: ${error.message}`)
			}

			try {
				if (hentry?.properties?.name && Array.isArray(hentry.properties.name)) {
					result.sourceTitle = hentry.properties.name[0]
				}
			} catch (error) {
				console.log(`error parsing source title: ${error.message}`)
			}
		} else {
			console.log(
				`target URL ${targetUrl.href} not found in source (${sourceUrl.href}) body`,
			)
		}
	}

	// save result
	const data = await arc.tables()
	await data.webmentions.put(result)

	return
})
