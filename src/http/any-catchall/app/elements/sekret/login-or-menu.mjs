/** @type {import('@enhance/types').EnhanceElemFn} */
export default function SekretLoginOrMenu({ html, state: { store } }) {
  let { admin } = store
  admin = !!admin

  const menu = [
    { href: '/sekret/blog', text: 'Blog Admin' },
    { href: '/auth/spotify/login', text: 'Spotify Auth' },
    { href: '/logout', text: 'Log out' },
  ]

  return html`
    <h1>Sekret</h1>

    ${
      admin
        ? menu.map(({ href, text }) => `<a href="${href}">${text}</a>`).join('')
        : '<a href="/auth/passkeys">Sign in</a>'
    }
  `
}
