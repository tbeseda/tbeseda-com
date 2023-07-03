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

		<p>
			This is an experiment with Vrite.io where I have copied a few articles
			from my contributions to <a href="https://begin.com/blog">Begin.com/blog</a>.
		</p>
		<p>
			Vrite sends webhooks when content is moved to Published, Drafts, or Ideas.
			The content is then fetched and stored in DynamoDB for quick retrieval and display here.
		</p>
		<p>See an early version in action below:</p>

		<iframe width="614" height="345" src="https://www.youtube-nocookie.com/embed/HNYgy9CCdIU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

		<hr>

		<h1>Published:</h1>
		${published
			.map(
				(article) => /*html*/ `
					<div class="article">
						<img src="${article.coverUrl}" alt="${article.coverAlt}">
						<a class="title" href="/articles/vrite/${article.id}">${article.title}</a>
						<p>${article.description}</p>
					</div>
				`,
			)
			.join('')}

		<h2>Drafts:</h2>
		${drafts
			.map(
				(article) => /*html*/ `
					<div class="article">
						<img src="${article.coverUrl}" alt="${article.coverAlt}">
						<a class="title" href="/articles/vrite/Drafts/${article.id}">${article.title}</a>
						<p>${article.description}</p>
					</div>
				`,
			)
			.join('')}

		<h2>Ideas:</h2>
		${ideas
			.map(
				(article) => /*html*/ `
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
