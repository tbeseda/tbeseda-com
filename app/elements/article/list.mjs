/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ArticleList({ html, state: { store } }) {
	const { articles = [] } = store

	return html`
		<style>
			:host {
				display: block;
			}
			ul {
				list-style: none;
				padding: 0;
			}
			ul li {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
				gap: 0.5rem;
				align-items: center;
				padding: 0.5rem;
				border-bottom: 1px solid #eee;
			}
		</style>

		<h2>Fake Article List</h2>
		<p>Articles have a TTL of 15 minutes.</p>

		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Article ID</th>
					<th>Published</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
			${articles
				.map(
					(article) => /*html*/ `
				<tr>
					<td>${article.title}</td>
					<td>${article.articleID}</td>
					<td>
						<input type="checkbox" disabled ${
							article.published ? 'checked' : ''
						} />
					</td>
					<td>${article.date}</td>
				</tr>`,
				)
				.join('')}
				${
					articles.length === 0
						? /*html*/ `
				<tr>
					<td colspan="4" style="text-align: center;">No articles found.</td>
				</tr>`
						: ''
				}
			</tbody>
		</table>
	`
}
