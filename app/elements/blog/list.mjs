/** @type {import('@enhance/types').EnhanceElemFn} */
export default function BlogList({ html, state: { store } }) {
	const { articles = [] } = store
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
	`
}
