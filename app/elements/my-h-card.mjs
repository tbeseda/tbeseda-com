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
			}
		</style>

		<div class="h-card">
			<div>${card.photoHtml}</div>

			<div>
				<h2>${card.nameLinkHtml}</h2>
				<div>${card.emailLinkHtml}</div>
				<p>
					${card.role},
					<span>${card.org}</span>
				</p>

				<div>
					${card.locality}, ${card.region} ${card['country-name']}
				</div>
			</div>
		</div>
	`
}
