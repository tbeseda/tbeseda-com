/** @type {import('@enhance/types').EnhanceElemFn} */
export default function SocialLinks({ html }) {
  const itemClasses = 'underline font-semibold'

  return html`
    <nav class="mb3">
      <ul class="list-none flex flex-row justify-around gap1">
        <li>
          <a href="https://github.com/tbeseda" target="_blank" class="${itemClasses}">
            github.com/tbeseda
          </a>
          <p class="mt-4 text-1">Public and open source work.</p>
        </li>
        <li>
          <a href="https://indieweb.social/@tbeseda" target="_blank" class="${itemClasses}">
            indieweb.social/@tbeseda
          </a>
          <p class="mt-4 text-1">
            In the Fediverse on Mastodon.
          </p>
        </li>
        <li>
          <a href="https://dev.to/tbeseda" target="_blank" class="${itemClasses}">
            dev.to/tbeseda
          </a>
          <p class="mt-4 text-1">Technical docs, snippets, and guides.</p>
        </li>
      </ul>
    </nav>
  `
}
