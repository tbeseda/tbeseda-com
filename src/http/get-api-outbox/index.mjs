import arc from '@architect/functions'

// GET public activities in an OrderedCollection

// * the spec says it should also be POST endpoint
// where this server would send out events
// unsure if that fits this architecture

export const handler = arc.http(async function http (request) {
  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html; charset=utf8',
    },
    body: 'Hello world!',
  }
})
