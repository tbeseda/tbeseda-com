/** @type {import('@enhance/types').EnhanceElemFn} */
export default function Index({ html, state: { store } }) {
	const { articles = [] } = store

	return html`
		<tb-header></tb-header>

		<main>
			<h1>WIP Blog Rewrite</h1>
			<p>I'm in the middle of rebuilding my blog to be based on a new editor and backed by DynamoDB💨</p>
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
