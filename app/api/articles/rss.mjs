/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	return {
		statusCode: 200,
		headers: {
			'cache-control': 'max-age=600, must-revalidate',
			'content-type': 'application/rss+xml; charset=UTF-8',
		},
		body: `
<?xml version="1.0" encoding="utf-8" ?>
<rss version="2.0" xml:base="http://tbeseda.com/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
  <title>tbeseda.com</title>
<description>Articles from Taylor Beseda</description>
<link>http://tbeseda.com/</link>
<language>en-us</language>
<item>
  <title>Hello, World</title>
  <link>http://tbeseda.com/articles/2022/12/hello-world</link>
  <description>My first entry on tbeseda.com. I can’t remember all the places I’ve published content, but I’m motivated to centralize it. It may not always look like this, but it will always be here. The impetus being: the tire fire that is Twitter, a move to federated social networks, and a recent call to action: Bring Back Blogging.</description>
  <guid isPermaLink="false">http://tbeseda.com/articles/2022/12/hello-world</guid>
  <pubDate>Sat, 25 Dec 2022 23:310 MST</pubDate>
  <source url="http://tbeseda.com/articles/rss">NASA Breaking News</source>
</item>
`.trim(),
	}
}
