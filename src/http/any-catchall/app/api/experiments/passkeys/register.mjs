import crypto from 'node:crypto'
import arc from '@architect/functions'
import base64url from 'base64url'
import cbor from 'cbor'

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

  // Generate a challenge
  const challenge = crypto.randomBytes(32).toString('base64url')

  // Store challenge in session
  session.challenge = challenge

  // Send registration options
  const registrationOptions = {
    challenge: challenge,
    rp: {
      name: 'tbeseda',
      id: 'localhost', // TODO: change to actual domain
    },
    user: {
      id: crypto.createHash('sha256').update(email).digest('base64url'),
      name: email,
      displayName: email,
    },
    pubKeyCredParams: [
      { type: 'public-key', alg: -7 }, // ES256
      { type: 'public-key', alg: -257 }, // RS256
    ],
    timeout: 60000,
    attestation: 'direct',
  }

  return {
    session,
    json: { registrationOptions },
  }
}

/**
 * @description Finish registration
 * @type {import('@enhance/types').EnhanceApiFn}
 **/
export async function post(req) {
  const { session, body } = req
  const { challenge: sessionChallenge } = session
  const { email, id, rawId, type, clientDataJSON, attestationObject } = body

  const user = await users.get({ email })
  if (user) throw new Error('User already exists!')

  const clientData = JSON.parse(base64url.decode(clientDataJSON))
  if (clientData.challenge !== sessionChallenge) {
    throw new Error('Invalid challenge!')
  }

  const attestationBuffer = base64url.toBuffer(attestationObject)
  const attestation = cbor.decodeFirstSync(attestationBuffer)
  const { authData } = attestation

  const buffer = Buffer.from(authData)
  const credIdLen = buffer.readUInt16BE(53)
  const cosePublicKey = buffer.slice(55 + credIdLen)

  const credential = {
    type,
    id,
    rawId,
    publicKey: base64url.encode(cosePublicKey),
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
