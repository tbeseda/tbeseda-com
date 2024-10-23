import fs from 'node:fs'
import process from 'node:process'
import arc from '@architect/functions'
import { createClient } from '@sanity/client'

const { SANITY_PROJECT_ID } = process.env

if (!SANITY_PROJECT_ID) throw 'Missing SANITY_PROJECT_ID'

export const client = createClient({
  projectId: SANITY_PROJECT_ID, // This doesn't need to be secret
  dataset: 'production',
  apiVersion: '2024-09-12', // use current date (YYYY-MM-DD) to target the latest API version
  perspective: 'published', // ensures Sanity "draft."s are not included
  useCdn: true, // use caching and edge
})

const testGroq = fs.readFileSync('./test.groq').toString()

export async function get(req) {
  const data = await client.fetch(testGroq)

  return {
    json: {
      testGroq,
      data,
    },
  }
}

export const handler = arc.http(get)
