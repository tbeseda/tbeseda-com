import standardMiddleware from './middleware/common.mjs'

export default async function Preflight ({ req }) {
  console.log(req.method, req.path)

  const title = `Taylor Beseda ${req.path}`

  const data = { title }
  for (const fn of standardMiddleware) {
    await fn(data)
  }

  return data
}
