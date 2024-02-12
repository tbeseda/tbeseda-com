import standardMiddleware from './middleware/index.mjs'

export default async function Preflight ({ req }) {
  const title = `Taylor Beseda ${req.path}`

  const data = { title }
  for (const fn of standardMiddleware) {
    await fn(req, data)
  }

  return data
}
