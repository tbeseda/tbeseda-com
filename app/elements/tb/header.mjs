import HCardPresenter from '../../lib/h-card-presenter.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbHeader({ html, state }) {
	const {
		attrs: { expanded },
		store: { hCards: { items: [myHCard] } },
	} = state
	const card = new HCardPresenter(myHCard)
	const isExpanded = typeof expanded !== 'undefined'

	const regionRoleOrg = /* html */ `
		<h4 class="text0 leading1 font-serif">
			${card.region} Front Range and all over the Internet.<br>
			${card.role} at <a href="https://begin.com" target="_blank">${card.org}</a>.
		</h4>
	`

	return html`
		<header class="
			h-card
			flex
			flex-col
			flex-row-lg
			items-center
			${isExpanded ? 'justify-center' : 'justify-start'}
			gap0
		">
			<a href="${card.props.url}" class="u-url">
				<img
					class="u-photo radius-100"
					width="${isExpanded ? '150px' : '90px'}"
					src="${card.props.photo}"
				>
			</a>

			<div>
				<h1 class="mb-1 text3">${card.name}</h1>
				<h3 class="mb-2 text1">${card.note}</h3>
				${isExpanded ? regionRoleOrg : ''}
			</div>

			<nav class="
				flex
				flex-row
				flex-col-lg
				gap-3
				${isExpanded ? 'text1' : 'text0'}
				font-semibold
			">
				<a href="/">/.</a>
				<div class="flex items-center gap-4">
					<a href="/articles">/articles</a>
					<a href="/articles/rss">
						<svg class="inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16">
							<path fill="currentColor" d="M 4 4.44 v 2.83 c 7.03 0 12.73 5.7 12.73 12.73 h 2.83 c 0 -8.59 -6.97 -15.56 -15.56 -15.56 Z m 0 5.66 v 2.83 c 3.9 0 7.07 3.17 7.07 7.07 h 2.83 c 0 -5.47 -4.43 -9.9 -9.9 -9.9 Z M 6.18 15.64 A 2.18 2.18 0 0 1 6.18 20 A 2.18 2.18 0 0 1 6.18 15.64"></path>
						</svg>
					</a>
				</div>
				<a href="/knowledge">/knowledge</a>
			</nav>
		</header>
	`
}
