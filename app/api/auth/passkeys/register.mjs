import process from 'node:process'
import arc from '@architect/functions'
import { generateRegistrationOptions, verifyRegistrationResponse } from '@simplewebauthn/server'

const { ARC_ENV } = process.env
const rpIDs = {
  production: 'tbeseda.com',
  staging: 'staging.tbeseda.com',
  testing: 'localhost',
}
const RP_ID = rpIDs[ARC_ENV] || rpIDs.testing
const ORIGIN = ARC_ENV === 'testing' ? 'http://localhost:3333' : `https://${RP_ID}`

const { users } = await arc.tables()

/**
 * @description Start registration
 * @type {import('@enhance/types').EnhanceApiFn}
 **/
export async function get(req) {
  const { session, query } = req
  const { email } = query

  // check if user exists
  const existingUser = await users.get({ email })
  // TODO: proceed to sign in if user exists
  if (existingUser) throw new Error('User already exists!')

  const options = await generateRegistrationOptions({
    rpName: RP_ID,
    rpID: RP_ID,
    userID: new Uint8Array(Buffer.from(email)),
    userName: email,
    attestationType: 'indirect',
    authenticatorSelection: {
      residentKey: 'required',
      userVerification: 'preferred',
    },
    supportedAlgorithmIDs: [-7, -257], // ES256, RS256
  })

  // Store the challenge in the session for verification
  session.challenge = options.challenge

  return {
    session,
    json: { registrationOptions: options },
  }
}

/**
 * @description Finish registration
 * @type {import('@enhance/types').EnhanceApiFn}
 **/
export async function post(req) {
  const { session, body } = req
  const { challenge: expectedChallenge } = session
  const { email, attestationResponse } = body

  const user = await users.get({ email })
  if (user) throw new Error('User already exists!')

  const verification = await verifyRegistrationResponse({
    response: attestationResponse,
    expectedChallenge,
    expectedOrigin: ORIGIN,
    expectedRPID: RP_ID,
    requireUserVerification: false,
  })

  if (!verification.verified) throw new Error('Verification failed!')
  if (!verification.registrationInfo) throw new Error('Registration info empty!')

  const { credential: registrationCredential } = verification.registrationInfo

  const credential = {
    ...registrationCredential,
    publicKey: Buffer.from(registrationCredential.publicKey).toString('base64'),
  }

  const newUser = await users.put({
    email,
    credential,
  })

  session.user = newUser

  return {
    session,
    json: { user: newUser },
  }
}
