import HCardPresenter from '../../lib/h-card-presenter.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbHeader({ html, state: { store } }) {
	const {
		hCards: { items: [myHCard] },
	} = store
	const { card } = new HCardPresenter(myHCard)

	return html`
		<style>
			:host {
				display: block;
				width: 100%;
				max-width: 94ch;
				margin: 0 auto;
			}
			header {
				display: flex;
				justify-content: space-between;
				padding: 1rem 0;
			}
			.title {
				display: flex;
				align-items: center;
				gap: 1rem;
			}
			img {
				border-radius: 50%;
				box-shadow: -0px 2px 2px rgba(3, 7, 18, 0.08),
					-1px 8px 6px rgba(3, 7, 18, 0.06),
					-3px 17px 14px rgba(3, 7, 18, 0.04),
					-5px 30px 24px rgba(3, 7, 18, 0.02);
				transition: box-shadow 0.25s ease-in-out;
			}
			img:hover {
				box-shadow: none;
			}
			h1 {
				margin: 0;
				font-size: 1.85rem;
				font-weight: 500;
			}
			h1 a {
				text-decoration: none;
			}
			nav {
				display: flex;
				gap: 1rem;
				align-items: center;
			}
			@media (max-width: 600px) {
				header {
					flex-direction: column;
					align-items: center;
				}
			}
		</style>

		<header class="h-card">
			<div class="title">
				<a href="${card.props.url}" class="u-url">
					<img class="u-photo" width="64px" src="/_public/me.jpg">
				</a>
				<h1><a href="/">${card.name}</a></h1>
			</div>

			<nav>
				<div><a href="/">home</a></div>
				<div><a href="/about">/about</a></div>
				<div><a href="/experiments">/experiments</a></div>
				<div>
					<a href="/blog">/blog</a>
					<a href="/blog/rss">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16">
							<path fill="currentColor" d="M 4 4.44 v 2.83 c 7.03 0 12.73 5.7 12.73 12.73 h 2.83 c 0 -8.59 -6.97 -15.56 -15.56 -15.56 Z m 0 5.66 v 2.83 c 3.9 0 7.07 3.17 7.07 7.07 h 2.83 c 0 -5.47 -4.43 -9.9 -9.9 -9.9 Z M 6.18 15.64 A 2.18 2.18 0 0 1 6.18 20 A 2.18 2.18 0 0 1 6.18 15.64"></path>
						</svg>
					</a>
				</div>
				<!--<div><a href="/knowledge">/knowledge</a></div>-->
			</nav>
		</header>
	`
}
