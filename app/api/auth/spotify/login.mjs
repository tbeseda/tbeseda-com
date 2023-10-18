// TODO: move out of /app

import { URLSearchParams } from 'node:url'
import { createID } from '../../../lib/create-id.mjs'

const { ARC_ENV, SPOTIFY_CLIENT, SPOTIFY_SECRET, SPOTIFY_REDIRECT } =
  process.env

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get ({ session }) {
  if (ARC_ENV === 'staging') return { text: 'Not prod' }

  if (!(SPOTIFY_CLIENT && SPOTIFY_SECRET && SPOTIFY_REDIRECT)) { throw new Error('Missing Spotify environment variables') }

  // generate random state
  const state = createID(16, '')
  const scopes = [
    'playlist-read-private',
    'user-follow-read',
    'user-library-read',
    'user-read-currently-playing',
    'user-read-email',
    'user-read-private',
    'user-read-recently-played',
    'user-top-read'
  ]
  const params = new URLSearchParams({
    state,
    scope: scopes.join(' '),
    response_type: 'code',
    client_id: SPOTIFY_CLIENT,
    redirect_uri: SPOTIFY_REDIRECT
  })

  return {
    status: 302,
    headers: {
      location: `https://accounts.spotify.com/authorize?${params.toString()}`
    },
    session: { ...session, spotifyState: state }
  }
}
