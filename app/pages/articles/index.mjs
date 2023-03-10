/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const {
		store: { articles },
	} = state

	function presentDate(string) {
		return new Date(string).toLocaleString('en-US', {
			timeZone: 'MST',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	return html`
		<tb-header></tb-header>

		<hr>

		<h2>Articles</h2>
		<ul>
			${articles
				.map(
					(a) => `
					<li>
						<div>
							<a href="${a.path}">${a.title}</a>
							<time>${presentDate(a.published)}</time>
						</div>
						<p>${a.summary}</p>
					</li>`,
				)
				.join('')}
		</ul>

		<hr>

		<tb-footer></tb-footer>
	`
}
