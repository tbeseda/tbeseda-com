/** @type {import('@enhance/types').EnhanceElemFn} */
export default function VriteIndex({ html, state: { store } }) {
	const { published = [], drafts = [], ideas = [] } = store

	return html`
		<style>
			.article {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
				margin-bottom: 1rem;
			}
			.article > * {
				margin: 0;
			}
			.article > img {
				width: 100%;
			}
			.article > .title {
				font-size: 1.5rem;
				font-weight: bold;
			}
		</style>

		<tb-header></tb-header>

		<hr>

		<h1>Published</h1>
		${published
			.map(
				(article) => `
					<div class="article">
						<img src="${article.coverUrl}" alt="${article.coverAlt}">
						<a class="title" href="/articles/vrite/${article.id}">${article.title}</a>
						<p>${article.description}</p>
					</div>
				`,
			)
			.join('')}

		<hr>

		<h2>Drafts</h2>
		${drafts
			.map(
				(article) => `
					<div class="article">
						<img src="${article.coverUrl}" alt="${article.coverAlt}">
						<a class="title" href="/articles/vrite/Drafts/${article.id}">${article.title}</a>
						<p>${article.description}</p>
					</div>
				`,
			)
			.join('')}

		<hr>

		<h2>Ideas</h2>
		${ideas
			.map(
				(article) => `
					<div class="article">
						<img src="${article.coverUrl}" alt="${article.coverAlt}">
						<span class="title">${article.title}</span>
						<p>${article.description}</p>
					</div>
				`,
			)
			.join('')}

		<hr>

		<tb-footer></tb-footer>
	`
}
