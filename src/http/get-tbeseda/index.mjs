import arc from '@architect/functions'

async function http (request) {
  const { headers } = request

  if ('accept' in headers) {
    const { accept } = headers

    if (accept?.split(',').indexOf('text/html') > -1) {
      return {
        status: 302,
        headers: { location: '/' },
      }
    }
  }

  return {
    headers: {
      'Content-Type': 'application/jrd+json',
    },
    body: JSON.stringify(
      {
        '@context': [
          'https://www.w3.org/ns/activitystreams',
          { '@language': 'en' },
        ],
        type: 'Person',
        id: 'https://tbeseda.com/tbeseda',
        outbox: 'https://tbeseda.com/api/outbox',
        following: 'https://tbeseda.com/api/following',
        followers: 'https://tbeseda.com/api/followers',
        inbox: 'https://tbeseda.com/api/inbox',
        preferredUsername: 'tbeseda',
        name: "tbeseda's blog",
        summary: 'Taylor Beseda is a web developer. On the Internet.',
        icon: {
          type: 'Image',
          mediaType: 'image/jpg',
          url: 'https://tbeseda.com/_public/me.jpg',
        },
        publicKey: {
          '@context': 'https://w3id.org/security/v1',
          '@type': 'Key',
          id: 'https://tbeseda.com/tbeseda#main-key',
          owner: 'https://tbeseda.com/tbeseda',
          publicKeyPem: 'TODO',
        },
      },
      null,
      2,
    ),
  }
}

export const handler = arc.http(http)
