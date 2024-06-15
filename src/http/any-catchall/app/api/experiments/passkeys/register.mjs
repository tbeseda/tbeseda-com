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

  // check if user exists
  const user = await users.get({ email })
  if (user) throw new Error('User already exists!')

  const clientData = JSON.parse(base64url.decode(clientDataJSON))
  const { challenge: clientChallenge } = clientData

  if (clientChallenge !== sessionChallenge) {
    throw new Error('Invalid challenge!')
  }

  // Convert attestation object to ArrayBuffer
  const attestationBuffer = base64url.toBuffer(attestationObject)

  // Decode attestation object
  const attestation = cbor.decodeFirstSync(attestationBuffer)
  const authData = attestation.authData || attestation.authData

  if (!authData) {
    throw new Error('Auth data not found in attestation object!')
  }

  // Parse authData
  const buffer = Buffer.from(authData)
  const rpIdHash = buffer.slice(0, 32)
  const flagsBuf = buffer.slice(32, 33)
  const flags = flagsBuf[0]
  const counterBuf = buffer.slice(33, 37)
  const counter = counterBuf.readUInt32BE(0)

  const aaguid = buffer.slice(37, 53)
  const credIdLenBuf = buffer.slice(53, 55)
  const credIdLen = credIdLenBuf.readUInt16BE(0)
  const credId = buffer.slice(55, 55 + credIdLen)
  const cosePublicKey = buffer.slice(55 + credIdLen)

  // Convert COSE key to Base64URL
  const publicKey = base64url.encode(cosePublicKey)

  const credential = {
    type,
    id,
    rawId,
    publicKey,
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
