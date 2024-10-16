/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get () {
  const lines = `
User-agent: *
Disallow: /sekret
Disallow: /sekret/
Disallow: /sekret/*

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Omgilibot
Disallow: /

User-Agent: FacebookBot
Disallow: /

User-agent: Amazonbot
Disallow: /
`

  return {
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
    text: lines.trim(),
  }
}
