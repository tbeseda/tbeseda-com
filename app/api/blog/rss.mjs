import arc from '@architect/functions'
import { Feed } from 'feed'

const { articles } = await arc.tables()
const query = await articles.scan({
	Limit: 10,
	FilterExpression: 'attribute_exists(published)',
	ProjectionExpression: 'title, published, slug, description, #date',
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
	id: 'https://tbeseda.com/',
	link: 'https://tbeseda.com/',
	language: 'en',
	image: 'https://tbeseda.com/_public/me.jpg',
	favicon: 'https://tbeseda.com/_public/me.jpg',
	copyright: `All rights reserved ${new Date().getFullYear()}, tbeseda`,
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

for (const article of sortedArticles) {
	const url = `https://tbeseda.com/blog/${article.slug}`
	feed.addItem({
		title: article.title,
		id: url,
		link: url,
		description: article.description,
		content: article.description,
		author: [
			{
				name: 'Taylor Beseda',
				// email: 'tbeseda@gmail.com',
				link: 'https://tbeseda.com/',
			},
		],
		date: new Date(article.date),
		// image: article.image,
	})
}

feed.addCategory('Web development')

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get() {
	return {
		statusCode: 200,
		headers: {
			'cache-control': 'max-age=600, must-revalidate',
			'content-type': 'text/xml; charset=utf-8',
		},
		body: feed.rss2(),
	}
}
