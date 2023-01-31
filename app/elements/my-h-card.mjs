import HCardPresenter from '../lib/h-card-presenter.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function Card({ html, state }) {
	const {
		store: { hCards: { items: [myHCard] } },
	} = state
	const card = new HCardPresenter(myHCard)

	return html`
		<style>
			img {
				height: 120px;
				border-radius: 2rem;
			}
		</style>

		<div class="h-card mt4 flex flex-row items-center gap-2">
			<div class="mb-3">${card.photoHtml}</div>

			<div class="flex flex-col">
				<h2 class="text1 mb-3">${card.nameLinkHtml}</h2>
				<div class="mb-3">${card.emailLinkHtml}</div>
				<p class="mb-3">
					${card.role},
					<span class="font-medium">${card.org}</span>
				</p>

				<div class="text-1 leading0">
					${card.locality}, ${card.region} ${card['country-name']}
				</div>
			</div>
		</div>
	`
}
