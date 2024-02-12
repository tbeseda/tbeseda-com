import arc from '@architect/functions'
import HeaderTimers from 'header-timers'
import MiniSearch from 'minisearch'
import { renderer } from '../../lib/pm2html-renderer.mjs'

const { articles: table } = await arc.tables()
const timers = HeaderTimers()

timers.start('articles-query', 'query articles')
// * get all articles
const scan = await table.scan({
  Limit: 100,
  FilterExpression: 'attribute_exists(published)',
  ProjectionExpression: 'articleID, title, published, slug, doc, #date',
  ExpressionAttributeNames: { '#date': 'date' },
})
let articles = scan.Items
  .filter(({ published }) => published)
  .sort((a, b) => b.date - a.date)
  .map(({ articleID, ...article }) => ({ id: articleID, ...article }))
timers.stop('articles-query')

timers.start('articles-render', 'render articles')
// * convert ProseMirror doc to text
// TODO: go straight to text, skip HTML
articles = articles.map(({ doc, ...article }) => {
  const html = renderer.render(doc).replace(/(<([^>]+)>)/gi, ' ')
  return { html, ...article }
})
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
export const get = async function ({ query }) {
  const { q } = query
  const response = { results: [], q }

  if (!q) return { json: response }

  // index can be saved to file with miniSearch.toJSON()

  timers.start('index-search', 'index search')
  // * search the index
  const results = miniSearch.search(q, { prefix: true })
  timers.stop('index-search')

  return {
    headers: { ...timers.toObject() },
    json: { ...response, results },
  }
}
