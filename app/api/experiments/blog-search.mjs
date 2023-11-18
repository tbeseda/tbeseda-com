import arc from '@architect/functions'
import MiniSearch from 'minisearch'
import { simpleLog, timers as addTimers } from '../../middleware/common.mjs'
import { renderer } from '../../lib/pm2html-renderer.mjs'

const { articles: table } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler ({ query, timers }) {
  timers.start('db', 'tb-articles')
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
  timers.stop('db')

  timers.start('render', 'tb-render')
  // * convert ProseMirror doc to text
  // TODO: go straight to text, skip HTML
  articles = articles.map(({ doc, ...article }) => {
    const html = renderer.render(doc).replace(/(<([^>]+)>)/gi, '')
    return { html, ...article }
  })
  timers.stop('render')

  timers.start('minisearch', 'tb-minisearch')
  // * create a search index
  const miniSearch = new MiniSearch({
    fields: ['title', 'html'],
    storeFields: ['title', 'slug'],
  })
  miniSearch.addAll(articles)
  timers.stop('minisearch')

  const { q } = query
  let results = []
  if (q) {
    timers.start('search', 'tb-search')
    // * search the index
    results = miniSearch.search(q, { prefix: true })
    timers.stop('search')
  }

  return {
    headers: { ...timers.toObject() },
    json: {
      results,
      index: miniSearch.toJSON(),
      articles,
    },
  }
}

export const get = [addTimers, simpleLog, getHandler]
