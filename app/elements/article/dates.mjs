/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state: { store } }) {
	const { article } = store

	return html`
    <time class="dt-published" datetime="${article.published}">${article.published}</time>
    ${
			article.edited
				? /* html */ `
            <div class="mt-4 text-1" style="color: var(--black-300);">
              Edited: <time class="dt-updated" datetime="${article.edited}">${article.edited}</time>
            </div>
          `
				: ''
		}
  `
}
