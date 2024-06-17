import process from 'node:process'
import arc from '@architect/functions'
import { generateAuthenticationOptions, verifyAuthenticationResponse } from '@simplewebauthn/server'

const { ARC_ENV, MY_EMAIL } = process.env
const rpIDs = {
  production: 'tbeseda.com',
  staging: 'staging.tbeseda.com',
  testing: 'localhost',
}
const rpID = rpIDs[ARC_ENV] || rpIDs.testing
const origin = ARC_ENV === 'testing' ? 'http://localhost:3333' : `https://${rpID}`

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
  if (user) return { json: { user } }

  // if there's a qEmail, the user is starting sign in
  if (qEmail) {
    const existingUser = await users.get({ email: qEmail })
    if (!existingUser?.credential) {
      throw new Error('User not found!')
    }

    const authOptions = await generateAuthenticationOptions({
      rpID,
      userVerification: 'required',
      allowCredentials: [
        {
          id: existingUser.credential.id,
          transports: ['internal', 'usb', 'ble', 'nfc'],
        },
      ],
    })

    session.challenge = authOptions.challenge

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

  const { email, assertionResponse } = body
  const user = await users.get({ email })
  if (!user?.credential) throw new Error('User not found!')

  const credentialID = user.credential.id
  const credentialPublicKey = Uint8Array.from(Buffer.from(user.credential.publicKey, 'base64'))

  if (assertionResponse.id !== credentialID) throw new Error('Credential mismatch!')

  const { challenge: expectedChallenge } = session
  const verification = await verifyAuthenticationResponse({
    response: assertionResponse,
    expectedChallenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
    authenticator: {
      credentialPublicKey,
      credentialID,
      counter: 0,
    },
  })

  if (!verification.verified) throw new Error('Verification failed!')

  session.user = user

  if (email === MY_EMAIL) session.admin = true

  return {
    session,
    json: { user },
  }
}
