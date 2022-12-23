/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbLinks({ html, state: { store } }) {
	const { links } = store
	const aClasses = 'underline font-semibold'
	const pClasses = 'mt-4 font-serif text-1'

	return html`
    <nav>
      <ul class="list-none grid flow-row flow-col-lg justify-center gap1">
        ${links
					.map(
						(link) => /* html */ `
              <li>
                <a href="https://${link.url}" target="_blank" class="${aClasses}">
                  ${link.url}
                </a>
                <p class="${pClasses}">${link.description}</p>
              </li>
            `,
					)
					.join('')}
      </ul>
    </nav>
  `
}
