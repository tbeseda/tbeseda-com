/** @type {import('@enhance/types').EnhanceElemFn} */
export default function SekretLoginOrMenu({ html, state: { store } }) {
  let { authorized } = store
  authorized = !!authorized

  const menu = [
    { href: '/sekret/blog', text: 'Blog Admin' },
    { href: '/auth/spotify/login', text: 'Spotify Auth' },
  ]

  return html`
    <h1>Sekret</h1>

    ${
      authorized
        ? menu.map(({ href, text }) => `<a href="${href}">${text}</a>`).join('')
        : /* html */ `
          <form method="post">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">Submit</button>
          </form>`
    }
  `
}
