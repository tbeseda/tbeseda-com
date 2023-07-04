/** @type {import('@enhance/types').EnhanceElemFn} */
export default function Index({ html, state: { store } }) {
	const { articles = [] } = store

	return html`
		<tb-header></tb-header>

		<main>
			<h1>WIP Blog</h1>
			<dl>
				${articles
					.map(
						({ title, description, date, slug }) => `
						<dt>
							<a href="/blog/${slug}">${title}</a>
						</dt>
						<dd>
							${description}
							<br>
							<small>${date}</small>
						</dd>
					`,
					)
					.join('')}
			</dl>
		</main>

		<tb-footer></tb-footer>
	`
}
