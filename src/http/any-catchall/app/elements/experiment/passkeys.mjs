/** @type {import('@enhance/types').EnhanceElemFn} */
export default function Passkeys({ state: { store } }) {
  const { user, registrationOptions, authOptions, email } = store

  if (user)
    return /*html*/ `
<form action="/experiments/passkeys" method="post">
  <input type="hidden" name="action" value="sign out">
  <input type="hidden" name="email" value="${user.email}">
  <button type="submit">Sign out ${user.email}</button>
</form>
<pre><code>${JSON.stringify(user, null, 2)}</code></pre>
    `

  if (registrationOptions)
    return /*html*/ `
<h4>Finish registration</h4>
<form action="/experiments/passkeys/register" method="post">
  <input name="email" value="${registrationOptions.user.name}" readonly>
  <input type="hidden" name="id" readonly>
  <input type="hidden" name="rawId" readonly>
  <input type="hidden" name="type" readonly>
  <input type="hidden" name="attestationObject" readonly>
  <input type="hidden" name="clientDataJSON" readonly>
  <button type="submit">Finish registration</button>
</form>
<pre><code class="language-json">${JSON.stringify(registrationOptions, null, 2)}</code></pre>
<pre id="credentialData"><code class="language-json"></code></pre>

<script type="module">
  const publicKey = ${registrationOptions ? JSON.stringify(registrationOptions) : 'null'}
  if (publicKey) {
    publicKey.challenge = Uint8Array.from(
      atob(base64urlToBase64(publicKey.challenge)),
      c => c.charCodeAt(0)
    )
    publicKey.user.id = Uint8Array.from(
      atob(base64urlToBase64(publicKey.user.id)),
      c => c.charCodeAt(0)
    )

    const credential = await navigator.credentials.create({ publicKey })

    const credentialData = {
      id: credential.id,
      rawId: toBase64Url(credential.rawId),
      type: credential.type,
      response: {
        attestationObject: toBase64Url(credential.response.attestationObject),
        clientDataJSON: toBase64Url(credential.response.clientDataJSON),
      },
    }

    // populate form with credentialData
    const $finishForm = document.querySelector('experiment-passkeys').querySelector('form')
    const $credentialData = document.querySelector('#credentialData')
    const $idInput = $finishForm.querySelector('input[name=id]')
    const $rawIdInput = $finishForm.querySelector('input[name=rawId]')
    const $typeInput = $finishForm.querySelector('input[name=type]')
    const $attestationObjectInput = $finishForm.querySelector('input[name=attestationObject]')
    const $clientDataJSONInput = $finishForm.querySelector('input[name=clientDataJSON]')

    $credentialData.querySelector('code').textContent = JSON.stringify(credentialData, null, 2)
    $idInput.value = credentialData.id
    $rawIdInput.value = credentialData.rawId
    $typeInput.value = credentialData.type
    $attestationObjectInput.value = credentialData.response.attestationObject
    $clientDataJSONInput.value = credentialData.response.clientDataJSON
  }

  function base64urlToBase64(base64url) {
    return base64url
      .replaceAll('-', '+')
      .replaceAll('_', '/')
      .padEnd(base64url.length + (4 - base64url.length % 4) % 4, '=')
  }
  function toBase64Url(buffer) {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
    return base64
      .replaceAll('+', '-')
      .replaceAll('/', '_')
      .replaceAll('=', '')
  }
</script>
    `

  if (authOptions)
    return /*html*/ `
<h4>Finish sign in</h4>
<form action="/experiments/passkeys" method="post">
  <input type="email" name="email" value="${email}" readonly>
  <input type="text" name="id" readonly>
  <input type="text" name="rawId" readonly>
  <input type="text" name="type" readonly>
  <input type="text" name="authenticatorData" readonly>
  <input type="text" name="clientDataJSON" readonly>
  <input type="text" name="signature" readonly>
  <input type="text" name="userHandle" readonly>
  <button type="submit">Finish sign in</button>
</form>
<pre><code class="language-json">${JSON.stringify(authOptions, null, 2)}</code></pre>

<script type="module">
  const publicKey = ${authOptions ? JSON.stringify(authOptions) : 'null'}
  if (publicKey) {
    publicKey.challenge = Uint8Array.from(
      atob(
        publicKey.challenge
          .replaceAll('-', '+')
          .replaceAll('_', '/')), c => c.charCodeAt(0)
      )
    publicKey.allowCredentials = publicKey.allowCredentials
      .map(cred => {
        cred.id = Uint8Array.from(
          atob(
            cred.id
              .replaceAll('-', '+')
              .replaceAll('_', '/')
          ),
          c => c.charCodeAt(0)
        )
        return cred
      })

    const assertion = await navigator.credentials.get({ publicKey })

    const assertionData = {
      id: assertion.id,
      rawId: toBase64Url(assertion.rawId),
      type: assertion.type,
      response: {
        authenticatorData: toBase64Url(assertion.response.authenticatorData),
        clientDataJSON: toBase64Url(assertion.response.clientDataJSON),
        signature: toBase64Url(assertion.response.signature),
        userHandle: assertion.response.userHandle ? toBase64Url(assertion.response.userHandle) : null,
      },
    }

    // populate form with assertionData
    const $finishForm = document.querySelector('experiment-passkeys').querySelector('form')
    const $idInput = $finishForm.querySelector('input[name=id]')
    const $rawIdInput = $finishForm.querySelector('input[name=rawId]')
    const $typeInput = $finishForm.querySelector('input[name=type]')
    const $authenticatorDataInput = $finishForm.querySelector('input[name=authenticatorData]')
    const $clientDataJSONInput = $finishForm.querySelector('input[name=clientDataJSON]')
    const $signatureInput = $finishForm.querySelector('input[name=signature]')
    const $userHandleInput = $finishForm.querySelector('input[name=userHandle]')

    $idInput.value = assertionData.id
    $rawIdInput.value = assertionData.rawId
    $typeInput.value = assertionData.type
    $authenticatorDataInput.value = assertionData.response.authenticatorData
    $clientDataJSONInput.value = assertionData.response.clientDataJSON
    $signatureInput.value = assertionData.response.signature
    $userHandleInput.value = assertionData.response.userHandle
  }

  function toBase64Url(buffer) {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
    return base64
      .replaceAll('+', '-')
      .replaceAll('/', '_')
      .replaceAll('=', '')
  }
</script>
  `

  return /*html*/ `
<h4>Register or sign in</h4>
<form action="/experiments/passkeys">
  <input type="email" name="email" placeholder="email" required>
  <div>
    <!-- TODO: reduce to one action/button -->
    <button type="submit" formaction="/experiments/passkeys/register">Register</button>
    <button type="submit">Sign in</button>
  </div>
</form>
  `
}
