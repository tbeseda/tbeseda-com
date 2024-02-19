import arc from '@architect/functions'
import { Feed } from 'feed'
import { renderer } from '../../lib/pm2html-renderer.mjs'

const TBESEDA = 'https://tbeseda.com'

const { articles } = await arc.tables()
const query = await articles.scan({
  Limit: 100,
  FilterExpression: 'attribute_exists(published)',
  ProjectionExpression: 'articleID, title, published, slug, description, doc, #date',
  ExpressionAttributeNames: {
    '#date': 'date',
  },
})
const sortedArticles = query.Items.filter(({ published }) => published).sort(
  (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf(),
)

const feed = new Feed({
  title: 'tbeseda (Taylor Beseda) blog',
  description: "tbeseda's personal blog",
  id: TBESEDA,
  link: TBESEDA,
  language: 'en',
  image: `${TBESEDA}/_public/me.jpg`,
  favicon: `${TBESEDA}/_public/me.jpg`,
  copyright: `All rights reserved ${new Date().getFullYear()}, tbeseda`,
  generator: 'tbeseda.com via Feed for Node.js',
  author: {
    name: 'Taylor Beseda',
    // email: 'tbeseda@gmail.com',
    link: TBESEDA,
  },
  feed: `${TBESEDA}/blog/rss`,
})

for (const article of sortedArticles) {
  const content = renderer.render(article.doc).replace(/src=["']\/([^"']+)["']/g, (_match, src) => {
    const absoluteUrl = `${TBESEDA}/${src}`
    return `src="${absoluteUrl}"`
  })
  feed.addItem({
    title: article.title,
    // id: article.articleID, // defaults to link value
    link: `${TBESEDA}/blog/${article.slug}`,
    description: article.description,
    content,
    author: [
      {
        name: 'Taylor Beseda',
        // email: 'tbeseda@gmail.com',
        link: TBESEDA,
      },
    ],
    date: new Date(article.date),
    // image: article.image,
  })
}

feed.addCategory('Web development')

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get() {
  const age = 10 // minutes
  return {
    statusCode: 200,
    headers: {
      'cache-control': `max-age=${age * 60}, must-revalidate`,
      'content-type': 'text/xml; charset=utf-8',
    },
    body: feed.rss2(),
  }
}
