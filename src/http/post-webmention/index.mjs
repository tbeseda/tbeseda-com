import arc from '@architect/functions'

export const handler = arc.http(async function (req) {
  const { body, headers } = req
  const { target, source } = body

  // validate incoming webmention
  const errors = []
  if (!target) {
    errors.push('missing_target')
  } else if (!target.startsWith('http')) {
    errors.push('invalid_target')
  }
  if (!source) {
    errors.push('missing_source')
  } else if (!source.startsWith('http')) {
    errors.push('invalid_source')
  }
  if (target && source && target === source) {
    errors.push('invalid: source must not match target')
  }

  if (errors.length > 0) {
    return {
      code: 400,
      json: { errors }
    }
  }

  await arc.events.publish({
    name: 'webmention-receive',
    payload: { body, headers }
  })
  return {
    code: 202,
    text: 'accepted'
  }
})
