/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbHeader({ html, state: { attrs } }) {
	const expanded = typeof attrs.expanded !== 'undefined'

	return expanded
		? html`
    <header class="flex flex-col items-center text-center gap-4">
      <img class="radius-100" width="100px" src="https://github.com/tbeseda.png">
      <h2 class="text0 uppercase font-semibold">@<a href="/">tbeseda</a></h2>
      <h1 class="mb-1 text3">Taylor Beseda</h1>
      <h3 class="mb-3 text1">Web Engineer, DX, & General Technologist</h3>
      <h4 class="text0 font-serif">
        Colorado Front Range and all over the Internet.
        Working at <a href="https://begin.com" target="_blank">Begin.com</a>.
      </h4>
    </header>
  `
		: html`
      <header class="flex items-center justify-center gap-2">
        <img class="radius-100" width="100px" src="https://github.com/tbeseda.png">
        <div>
          <ul class="flex flex-row gap-1 list-none text0">
            <li class="uppercase font-semibold">@<a href="/">tbeseda</a></li>
            <li><a href="/articles">/articles</a></li>
          </ul>
          <h1 class="mb-4 text3">Taylor Beseda</h1>
          <h3 class="text0">Web Engineer, DX, & General Technologist</h3>
        </div>
      </header>
    `
}
