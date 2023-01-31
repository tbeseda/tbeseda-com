import { Feed } from 'feed'
import articlesData from '../../lib/articles-data.mjs'

const articles = articlesData.filter((a) => !a.hidden)

const feed = new Feed({
	title: 'tbeseda (Taylor Beseda)',
	description: "tbeseda's personal website",
	id: 'http://tbeseda.com/',
	link: 'http://tbeseda.com/',
	language: 'en',
	// image: 'http://tbeseda.com/image.png',
	favicon: 'http://tbeseda.com/_public/me.jpg',
	copyright: `All rights reserved ${new Date().getFullYear()}, tbeseda`,
	// updated: new Date(2013, 6, 14), // optional, default = today
	generator: 'tbeseda.com via Feed for Node.js',
	feedLinks: {
		json: 'https://tbeseda.com/json',
		atom: 'https://tbeseda.com/atom',
	},
	author: {
		name: 'Taylor Beseda',
		// email: 'tbeseda@gmail.com',
		link: 'https://tbeseda.com/',
	},
})

for (const article of articles) {
	const url = `https://tbeseda.com/${article.path}`
	feed.addItem({
		title: article.title,
		id: url,
		link: url,
		description: article.summary,
		content: article.html,
		author: [
			{
				name: 'Taylor Beseda',
				// email: 'tbeseda@gmail.com',
				link: 'https://tbeseda.com/',
			},
		],
		date: new Date(article.published),
		// image: article.image,
	})
}

feed.addCategory('Web development')

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	return {
		statusCode: 200,
		headers: {
			'cache-control': 'max-age=600, must-revalidate',
			'content-type': 'text/xml; charset=utf-8',
		},
		body: feed.rss2(),
	}
}
