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
  const publicKey = coseToPem(cosePublicKey)

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

const coseToPem = (coseKeyBuffer) => {
  const coseKey = cbor.decodeFirstSync(coseKeyBuffer)

  const x = coseKey.get(-2)
  const y = coseKey.get(-3)

  if (!(x instanceof Buffer) || !(y instanceof Buffer)) {
    throw new Error('Invalid COSE key parameters')
  }

  const pemKey = Buffer.concat([
    Buffer.from('3059301306072a8648ce3d020106082a8648ce3d03010703420004', 'hex'),
    x,
    y,
  ])

  return `-----BEGIN PUBLIC KEY-----\n${pemKey.toString('base64')}\n-----END PUBLIC KEY-----\n`
}
