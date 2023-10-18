/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state: { store } }) {
  const { mentions } = store

  return mentions?.length > 0
    ? html`
    <h2>Article Webmentions</h2>
    <ul>
      ${mentions
        // TODO: markup with microformats
        .map(
          (m) => `
            <li>
              <a href="${m.source}">
                ${m.sourceTitle || m.source}
              </a>
              <small>${m.sourceAuthor ? `(${m.sourceAuthor})` : ''}</small>
              <details><pre>${JSON.stringify(m, null, 2)}</pre></details>
            </li>
          `
        )
        .join('')}
    </ul>
  `
    : ''
}
