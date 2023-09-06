import { Collection } from 'waylon'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function BlogList({ html, state: { store } }) {
	const { articles = [] } = store
	const collection = new Collection(articles)
	return html`
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

		<h3 style="margin-top: 15rem;">
			<a href="https://www.npmjs.com/package/waylon" target="_blank">Waylon Collection</a>
			tests
		</h3>
		<h4><code>list()</code>:</h4>
		${collection.list(
			({ title, slug }) => `<a href="/blog/${slug}">${title}</a>`,
		)}
		<h4><code>table()</code>:</h4>
		${collection.table()}
	`
}
