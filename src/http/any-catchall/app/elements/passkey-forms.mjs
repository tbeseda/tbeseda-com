/** @type {import('@enhance/types').EnhanceElemFn} */
export default function Passkeys({ state: { store } }) {
  const { user, registrationOptions, authOptions, email } = store

  if (user)
    return /*html*/ `
<h4>You're signed in</h4>

<form action="/logout" method="get">
  <button type="submit">Log out ${user.email}</button>
</form>
    `

  if (registrationOptions)
    return /*html*/ `
<h4>Finish registration for ${registrationOptions.user.name}</h4>

<script src="https://unpkg.com/@simplewebauthn/browser/dist/bundle/index.umd.min.js"></script>
<script type="module">
  const { startRegistration } = window.SimpleWebAuthnBrowser
  const options = ${registrationOptions ? JSON.stringify(registrationOptions) : 'null'}

  if (options) {
    const attestationResponse = await startRegistration(options)

    const verifyResponse = await fetch('/auth/passkeys/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: options.user.name,
        attestationResponse,
      }),
    })

    if (verifyResponse.ok)
      window.location.replace('/auth/passkeys')
    else {
      alert('Registration failed!')
      window.location.replace('/auth/passkeys')
    }
  }
</script>
    `

  if (authOptions)
    return /*html*/ `
<h4>Finish sign in for ${email}</h4>

<script src="https://unpkg.com/@simplewebauthn/browser/dist/bundle/index.umd.min.js"></script>
<script type="module">
  const { startAuthentication } = window.SimpleWebAuthnBrowser
  const options = ${authOptions ? JSON.stringify(authOptions) : 'null'}
  if (options) {
    const assertionResponse = await startAuthentication(options)

    const verifyResponse = await fetch('/auth/passkeys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: '${email}',
        assertionResponse,
      }),
    })

    if (verifyResponse.ok)
      window.location.replace('/auth/passkeys')
    else {
      alert('Sign in failed!')
      window.location.replace('/auth/passkeys')
    }
  }
</script>
  `

  return /*html*/ `
<h4>Register or sign in</h4>

<form action="/auth/passkeys">
  <input type="email" name="email" placeholder="email" required>
  <div>
    <!-- TODO: reduce to one action/button -->
    <button type="submit" formaction="/auth/passkeys/register">Register</button>
    <button type="submit">Sign in</button>
  </div>
</form>
  `
}
