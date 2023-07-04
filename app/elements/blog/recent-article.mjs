import arc from '@architect/functions'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function BlogRecentArticle({ html, state: { store } }) {
	const { recentArticle } = store

	return html`
		<style>
			:host {
				display: block;
			}
		</style>
		<h4>
			<a href="/blog/${recentArticle.slug}">${recentArticle.title}</a>
		</h4>
		<p>${recentArticle.description}</p>
	`
}
