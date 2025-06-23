import process from 'node:process'
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

export async function countArticles() {
  // smoke test
  const data = await client.fetch("count(*[_type == 'article'])")
  return data
}

export async function getRecentPublishedArticles() {
  const query = `*[_type == 'article' && publishedAt < now()] | order(publishedAt desc) [0...15] {
    title,
    slug,
    publishedAt,
    description,
  }`
  const articles = await client.fetch(query)
  return articles
}

export async function getMostRecentArticle() {
  const query = `*[_type == 'article' && publishedAt < now()] | order(publishedAt desc) [0] {
    title,
    slug,
    publishedAt,
    description,
  }`
  const article = await client.fetch(query)
  return article
}

export async function getArticleBySlug(slug) {
  const query = `*[_type == 'article' && slug.current == $slug] [0] {
    title,
    slug,
    publishedAt,
    description,
    content,
    narrationEnabled,
    narration {
      asset->{
        url,
        originalFilename,
        size,
        mimeType
      }
    },
  }`
  const article = await client.fetch(query, { slug })
  return article
}

export async function getCodeExperiments() {
  const query = `*[_type == 'codeExperiment' && isVisible == true] {
    title,
    slug,
    path,
    publishedAt,
    updatedAt,
    excerpt,
    content,
    technology,
    image,
    isWIP,
    isFeatured,
  }`
  const experiments = await client.fetch(query)
  return experiments
}

export async function getCodeExperimentBySlug(slug) {
  const query = `*[_type == 'codeExperiment' && slug.current == $slug] [0] {
    title,
    slug,
    path,
    publishedAt,
    updatedAt,
    excerpt,
    content,
    technology,
    image,
    isWIP,
    isFeatured,
  }`
  const experiment = await client.fetch(query, { slug })
  return experiment
}
