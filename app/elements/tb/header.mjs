import HCardPresenter from '../../lib/h-card-presenter.mjs'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbHeader({ html, state }) {
	const {
		store: { hCards: { items: [myHCard] } },
	} = state
	const card = new HCardPresenter(myHCard)

	return html`
    <header class="h-card flex flex-col flex-row-lg items-center justify-center gap0">
      <a href="${card.props.url}" class="u-url">
        <img class="u-photo radius-100" width="150px" src="${card.props.photo}">
      </a>

      <div>
        <h1 class="mb-1 text3">${card.name}</h1>
        <h3 class="mb-2 text1">${card.note}</h3>
        <h4 class="text0 leading1 font-serif">
          ${card.region} Front Range and all over the Internet.<br>
          ${card.role} at <a href="https://begin.com" target="_blank">${card.org}</a>.
        </h4>
      </div>

      <nav class="flex flex-row flex-col-lg gap-3 text1 font-semibold">
        <a href="/">/.</a>
        <a href="/articles">/articles</a>
        <a href="/knowledge">/knowledge</a>
      </nav>
    </header>
  `
}
