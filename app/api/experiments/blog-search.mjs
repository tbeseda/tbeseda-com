import HeaderTimers from 'header-timers'
import MiniSearch from 'minisearch'
import { renderArticle } from '../../lib/article-renderer.mjs'
import { client } from '../../lib/sanity-client.mjs'

const timers = HeaderTimers()

timers.start('articles-query', 'query articles')
// * get all articles
let articles = await client.fetch(
  `*[_type == 'article' && publishedAt < now()]
    | order(publishedAt desc)
    { title, slug, publishedAt, content }`,
)

timers.stop('articles-query')

timers.start('articles-render', 'render articles')
// * convert ProseMirror doc to text
// TODO: go straight to text, skip HTML
articles = articles.map(({ slug, content, ...article }) => ({
  id: slug,
  html: renderArticle(content).replace(/(<([^>]+)>)/gi, ' '),
  ...article,
}))

timers.stop('articles-render')

timers.start('articles-index', 'index articles')
// * create a search index
const miniSearch = new MiniSearch({
  fields: ['title', 'html'],
  storeFields: ['title', 'slug'],
})
miniSearch.addAll(articles)
timers.stop('articles-index')

/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async ({ query }) => {
  const { q } = query
  const response = { results: [], q }

  if (!q) return { json: response }

  // index can be saved to file with miniSearch.toJSON()

  timers.start('index-search', 'index search')
  // * search the index
  const results = miniSearch.search(q, { prefix: true })
  timers.stop('index-search')

  return {
    headers: { ...timers.object() },
    json: { ...response, results },
  }
}
