import { renderer } from '../../lib/pm2html-renderer.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function BlogArticle({ html, state: { store } }) {
	const { article } = store

	return html`
		<article>
			<p>${article.date}</p>
			<h1>${article.title}</h1>
			${renderer.render(article.doc)}
		</article>
	`
}
