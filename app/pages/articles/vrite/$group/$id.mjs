import { htmlTransformer } from '@vrite/sdk/transformers'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function VriteArticle({ html, state: { store } }) {
	const { content } = store

	return html`
		<tb-header></tb-header>

		<hr>

		<article class="h-entry">
			<img src="${content.coverUrl}" alt="${content.coverAlt}">
			<h1><a href="${content.canonicalLink}" target="_blank">${content.title}</a></h1>
			${htmlTransformer(content.content)}
		</article>

		<hr>

		<tb-footer></tb-footer>
	`
}