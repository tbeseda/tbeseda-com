/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbFooter({ html, state : { store } }) {
  return html`
    <footer class="flex flex-row justify-center items-end gap-4">
      <div>${store.icon}</div>
      <p class="text-1">Say "hi" on <a class="" rel="me" href="https://indieweb.social/@tbeseda">Mastodon</a>.</p>
    </footer>
  `
}
