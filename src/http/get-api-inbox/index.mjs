import arc from '@architect/functions'

// incoming follow and undo follow Activity events
// verify the signature
// fetch follower's public key
// verify the signature
// add the follower to the db
// send accept to new follower

export const handler = arc.http(async function http (request) {
  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html; charset=utf8',
    },
    body: 'Hello world!',
  }
})
