/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state: { store } }) {
	const { article } = store

	return html`
		<style>
			:host {
				display: grid;
				gap: 1.15rem;
				font-size: 1.1rem;
				line-height: 1.2;
				font-family: var(--font-serif);
			}
			h1, h2, h3, h4 {
				font-family: var(--font-sans);
				font-weight: 600;
			}
			h1 {
				font-size: 2rem;
			}
			h2 {
				font-size: 1.75rem;
			}
			h3 {
				font-size: 1.5rem;
			}
			h4 {
				font-size: 1.25rem;
			}

			p {
			}

			ul, ol {
				margin-left: 1.5rem;
			}

			code {
				font-family: var(--font-mono);
			}

			p img {
				margin: 0 auto;
			}

			pre.hljs {
				padding: 1rem;
				font-family: var(--font-mono);
				line-height: 1.15;
				tab-size: 2;
				border: 1px solid var(--begincoral-500);
			}

			.side-by-side {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				gap: 2rem;
			}
			.side-by-side > * {
				flex: 1;
			}
		</style>

		${article.html}
	`
}
