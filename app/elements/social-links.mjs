/** @type {import('@enhance/types').EnhanceElemFn} */
export default function SocialLinks({ html }) {
  const aClasses = 'underline font-semibold'
  const pClasses = 'mt-4 font-serif text-1'

  return html`
    <nav class="mb3">
      <ul class="list-none flex flex-row justify-around gap1">
        <li>
          <a href="https://github.com/tbeseda" target="_blank" class="${aClasses}">
            github.com/tbeseda
          </a>
          <p class="${pClasses}">Public and open source work.</p>
        </li>
        <li>
          <a href="https://indieweb.social/@tbeseda" target="_blank" class="${aClasses}">
            indieweb.social/@tbeseda
          </a>
          <p class="${pClasses}">
            In the Fediverse on Mastodon.
          </p>
        </li>
        <li>
          <a href="https://dev.to/tbeseda" target="_blank" class="${aClasses}">
            dev.to/tbeseda
          </a>
          <p class="${pClasses}">Technical docs, snippets, and guides.</p>
        </li>
      </ul>
    </nav>
  `
}
