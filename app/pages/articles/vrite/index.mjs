/** @type {import('@enhance/types').EnhanceElemFn} */
export default function VriteIndex({ html, state: { store } }) {
	const { articles = [] } = store

	console.log('articles', articles)

	return html`
		<tb-header></tb-header>

		<hr>

		<h1>Articles from Vrite.io</h1>

		<ul>
			${articles
				.map(
					(article) => `
					<li>
						<a href="/articles/vrite/${article.id}">${article.title}</a>
					</li>
				`,
				)
				.join('')}
		</ul>

		<hr>

		<tb-footer></tb-footer>
	`
}
