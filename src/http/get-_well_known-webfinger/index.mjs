import arc from '@architect/functions'

async function http (request) {
  return {
    headers: {
      'Content-Type': 'application/jrd+json',
    },
    body: JSON.stringify(
      {
        subject: 'acct:tbeseda@tbeseda.com',
        aliases: ['https://indieweb.social/@tbeseda'],
        links: [
          {
            rel: 'self',
            type: 'application/activity+json',
            href: 'https://tbeseda.com/tbeseda',
          },
        ],
      },
      null,
      2,
    ),
  }
}

export const handler = arc.http(http)
