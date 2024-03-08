import arc from '@architect/functions'

const { things } = await arc.tables()

let lines = `
User-agent: *
Disallow: /sekret
Disallow: /sekret/
Disallow: /sekret/*
`

async function get() {
  const agentsThing = await things.get({
    key: 'agents:dark-visitors',
  })

  if (agentsThing) {
    const { agents } = agentsThing
    const agentLines = agents.map((agent) => `${agent}\nDisallow: /`).join('\n\n')
    lines += `\n${agentLines}`
  }

  return {
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
    text: lines.trim(),
  }
}

export const handler = arc.http(get)
