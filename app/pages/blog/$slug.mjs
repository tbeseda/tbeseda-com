import { renderer } from '../../lib/pm2html-renderer.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function Slug({ html, state: { store } }) {
	const { article } = store

	return html`
		<tb-header></tb-header>

		<hr>

		<article>
			<h1>${article.title}</h1>
			<p>${article.date}</p>
			${renderer.render(article.doc)}
		</article>

		<hr>

		<tb-footer></tb-footer>
	`
}
