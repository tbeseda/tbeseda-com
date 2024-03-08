import arc from '@architect/functions'

const matcher = /^User-agent:.*/
const { things } = await arc.tables()

export async function handler() {
  const request = await fetch('https://darkvisitors.com/robots-txt-builder')
  const agents = (await request.text()).split('\n').filter((line) => matcher.test(line.trim()))

  await things.put({
    key: 'agents:dark-visitors',
    type: 'agents',
    agents,
    updated: new Date().toISOString(),
  })

  return
}
