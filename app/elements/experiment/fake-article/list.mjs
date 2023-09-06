import { getSchema } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { AddBreaksToEmptyTextblocks, Renderer } from 'pm2html'

const schema = getSchema([StarterKit])
const renderer = new Renderer({
	schema,
	transformers: [new AddBreaksToEmptyTextblocks()],
})

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentFakeArticleList({ html, state: { store } }) {
	const { articles = [] } = store

	return html`
		<style>
			:host {
				display: block;
			}
			tr {
				border-bottom: none;
			}
			thead tr,
			tr:has(td[colspan]) {
				border-bottom: 1px solid #ccc;
			}
		</style>

		<h2>Fake Article List</h2>
		<p>Articles have a TTL of 15 minutes. Yes, the styling isn't great 😎</p>

		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Slug</th>
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
					<td>${article.slug}</td>
					<td>${article.articleID}</td>
					<td>
						<input type="checkbox" disabled ${
							article.published ? 'checked' : ''
						} />
					</td>
					<td>${article.date}</td>
				</tr>
				<tr>
					<td colspan="5">
						<details>
							<summary>${article.description}</summary>
							${renderer.render(article.doc)}
						</details>
					</td>
				</tr>
				`,
				)
				.join('')}
				${
					articles.length === 0
						? /*html*/ `
				<tr>
					<td colspan="5" style="text-align: center;">No articles found.</td>
				</tr>`
						: ''
				}
			</tbody>
		</table>
	`
}
