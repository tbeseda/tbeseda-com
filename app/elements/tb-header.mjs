/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbHeader({ html }) {
	return html`
    <header class="flex flex-col items-center text-center gap-4">
      <img class="radius-100" width="100px" src="https://github.com/tbeseda.png">
      <h2 class="text0 uppercase">@tbeseda</h2>
      <h1 class="mb-1 text3">Taylor Beseda</h1>
      <h3 class="mb-3 text1">Web Engineer, DX, & General Technologist</h3>
      <h4 class="text0 font-serif">
        Colorado Front Range and all over the Internet.
        Working at <a href="https://begin.com" target="_blank">Begin.com</a>.
      </h4>
    </header>
  `
}
