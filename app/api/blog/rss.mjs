import { Feed } from 'feed'
import { client } from '../../lib/sanity-client.mjs'
import { renderArticle } from '../../lib/article-renderer.mjs'

const TBESEDA = 'https://tbeseda.com'

const articles = await client.fetch(
  `*[_type == 'article' && publishedAt < now()]
    | order(publishedAt desc)
    { title, slug, publishedAt, content }`,
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

for (const article of articles) {
  const content = renderArticle(article.content).replace(
    /src=["']\/([^"']+)["']/g,
    (_match, src) => {
      const absoluteUrl = `${TBESEDA}/${src}`
      return `src="${absoluteUrl}"`
    },
  )
  feed.addItem({
    title: article.title,
    // id: article.articleID, // defaults to link value
    link: `${TBESEDA}/blog/${article.slug.current}`,
    description: article.description,
    content,
    author: [
      {
        name: 'Taylor Beseda',
        // email: 'tbeseda@gmail.com',
        link: TBESEDA,
      },
    ],
    date: new Date(article.publishedAt),
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
