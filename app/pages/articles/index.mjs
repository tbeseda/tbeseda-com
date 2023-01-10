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
		<tb-header class="block pt4 mb4"></tb-header>

		<hr class="mb2">

		<h2 class="mb1 text3">Articles</h2>
		<ul class="mb3 list-none text1 grid gap1">
			${articles
				.map(
					(a) => `
					<li class="grid flow-row gap-2">
						<div class="grid flow-col gap-1 justify-start items-end">
							<a href="${a.path}">${a.title}</a>
							<time class="text-1">${presentDate(a.published)}</time>
						</div>
						<p class="text0 leading1">${a.summary}</p>
					</li>`,
				)
				.join('')}
		</ul>

		<hr class="mb2">

		<tb-footer></tb-footer>
	`
}
