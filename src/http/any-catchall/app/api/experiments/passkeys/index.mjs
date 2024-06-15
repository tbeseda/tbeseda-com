import crypto from 'node:crypto'
import arc from '@architect/functions'
import base64url from 'base64url'
import cbor from 'cbor'

const { users } = await arc.tables()

/**
 * @description Show forms and/or start sign in
 * @type {import('@enhance/types').EnhanceApiFn}
 **/
export async function get(req) {
  const { session, query } = req
  const { user } = session
  const { email: qEmail } = query

  // already signed in
  if (user) {
    return {
      json: { user },
    }
  }

  // if there's a qEmail, the user is starting sign in
  if (qEmail) {
    const existingUser = await users.get({ email: qEmail })
    if (!existingUser?.credential) {
      throw new Error('User not found!')
    }
    const challenge = crypto.randomBytes(32).toString('base64url')
    session.challenge = challenge

    const authOptions = {
      challenge: challenge,
      allowCredentials: [
        {
          id: existingUser.credential.id,
          type: 'public-key',
          transports: ['usb', 'ble', 'nfc'],
        },
      ],
      timeout: 60000,
      userVerification: 'preferred',
    }

    return {
      session,
      json: { authOptions, email: qEmail },
    }
  }

  // show sign in form
  return {}
}

/**
 * @description Complete sign in or sign out
 * @type {import('@enhance/types').EnhanceApiFn}
 **/
export async function post(req) {
  const { session, body } = req
  if (body.action === 'sign out') {
    session.user = null
    return { session }
  }

  const { challenge: sessionChallenge } = session
  if (body.action === 'sign out') {
    session.user = null
    return { session }
  }

  const { email, id, authenticatorData, clientDataJSON, signature } = body
  const existingUser = await users.get({ email })
  if (!existingUser?.credential) {
    throw new Error('User not found!')
  }
  if (id !== existingUser.credential.id) {
    throw new Error('Credential mismatch!')
  }

  const clientData = JSON.parse(base64url.decode(clientDataJSON))
  if (clientData.challenge !== sessionChallenge) {
    throw new Error('Challenge mismatch!')
  }

  const cosePublicKey = base64url.toBuffer(existingUser.credential.publicKey)
  console.log('COSE Public Key (Base64URL):', existingUser.credential.publicKey)
  console.log('COSE Public Key (Buffer):', cosePublicKey)

  let publicKey
  try {
    publicKey = coseToPem(cosePublicKey)
  } catch (error) {
    console.error('Error converting COSE key to PEM:', error)
    throw new Error('Failed to convert COSE key to PEM format')
  }

  console.log({ authenticatorData, clientDataJSON, signature, publicKey })

  const clientDataHash = crypto
    .createHash('SHA256')
    .update(base64url.toBuffer(clientDataJSON))
    .digest()
  const signedData = Buffer.concat([base64url.toBuffer(authenticatorData), clientDataHash])

  const verify = crypto.createVerify('SHA256')
  verify.update(signedData)

  const valid = verify.verify(publicKey, base64url.toBuffer(signature))

  if (!valid) {
    throw new Error('Invalid signature!')
  }

  session.user = existingUser

  return {
    session,
    json: { user: existingUser },
  }
}

// Utility function to convert COSE key to PEM format
const coseToPem = (coseKeyBuffer) => {
  console.log('Decoding COSE Key Buffer:', coseKeyBuffer)
  let coseKey
  try {
    coseKey = cbor.decodeFirstSync(coseKeyBuffer)
  } catch (error) {
    console.error('Error decoding COSE key:', error)
    throw new Error('Failed to decode COSE key')
  }

  console.log('Decoded COSE Key:', coseKey)

  // Ensure the key has the necessary parameters
  if (!coseKey || !coseKey.get(-2) || !coseKey.get(-3)) {
    throw new Error('Invalid COSE key format')
  }

  const x = coseKey.get(-2)
  const y = coseKey.get(-3)

  console.log('COSE Key X Coordinate:', x)
  console.log('COSE Key Y Coordinate:', y)

  // Ensure x and y are buffers
  if (!(x instanceof Buffer) || !(y instanceof Buffer)) {
    throw new Error('Invalid COSE key parameters')
  }

  // Construct the PEM key
  const pemKey = Buffer.concat([
    Buffer.from('3059301306072a8648ce3d020106082a8648ce3d03010703420004', 'hex'),
    x,
    y,
  ])

  return `-----BEGIN PUBLIC KEY-----\n${pemKey.toString('base64')}\n-----END PUBLIC KEY-----\n`
}
