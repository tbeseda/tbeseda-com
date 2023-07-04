import HCardPresenter from '../../lib/h-card-presenter.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbHeader({ html, state }) {
	const {
		store: { hCards: { items: [myHCard] } },
	} = state
	const { card } = new HCardPresenter(myHCard)

	return html`
		<style>
			h1, h3, h4 {
				margin: 0;
			}
			header {
				display: flex;
				gap: 0.85rem;
				justify-content: space-between;
			}
			img {
				border-radius: 50%;
				opacity: 0.8;
			}
			img:hover {
				opacity: 1;
			}
			@media (max-width: 560px) {
					header {
						flex-direction: column;
						text-align: center;
					}
					img {
						opacity: 1;
					}
				}
		</style>

		<header class="h-card">
			<a href="${card.props.url}" class="u-url">
				<img
					class="u-photo"
					width="125px"
					src="${card.props.photo}"
				>
			</a>

			<div>
				<h1>
					<a href="/">${card.name}</a>
				</h1>
				<h3>${card.note}</h3>
				<h4>
					${card.region}<br>
					${card.role} at <a href="https://begin.com" target="_blank">${card.org}</a>.
				</h4>
			</div>

			<nav>
				<ul>
					<div><a href="/">home</a></div>
					<div>
						<a href="/blog">/blog</a>
						<a href="/blog/rss">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16">
							<path fill="currentColor" d="M 4 4.44 v 2.83 c 7.03 0 12.73 5.7 12.73 12.73 h 2.83 c 0 -8.59 -6.97 -15.56 -15.56 -15.56 Z m 0 5.66 v 2.83 c 3.9 0 7.07 3.17 7.07 7.07 h 2.83 c 0 -5.47 -4.43 -9.9 -9.9 -9.9 Z M 6.18 15.64 A 2.18 2.18 0 0 1 6.18 20 A 2.18 2.18 0 0 1 6.18 15.64"></path>
						</svg>
					</div>
					</div>
					<div><a href="/knowledge">/knowledge</a></div>
					<div><a href="/experiments">/experiments</a></div>
				</ul>
			</nav>
		</header>
	`
}
