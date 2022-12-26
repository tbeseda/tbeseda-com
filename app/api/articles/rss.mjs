/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	return {
		statusCode: 200,
		headers: {
			'cache-control': 'max-age=600, must-revalidate',
			'content-type': 'text/xml; charset=utf-8',
		},
		body: `
<?xml version="1.0" encoding="utf-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
  <channel>
    <title>tbeseda.com Articles</title>
    <description>Articles from Taylor Beseda</description>
    <link>https://tbeseda.com/</link>
    <image>
      <url>https://github.com/tbeseda.png</url>
      <title>tbeseda.com</title>
      <link>https://tbeseda.com/</link>
    </image>
    <generator>I wrote this XML by hand</generator>
    <atom:link href="https://tbeseda.com/articles/rss/" rel="self" type="application/rss+xml"/>
    <item>
      <title>Hello, World</title>
      <description>My first entry on tbeseda.com. I can’t remember all the places I’ve published content, but I’m motivated to centralize it. It may not always look like this, but it will always be here. The impetus being: the tire fire that is Twitter, a move to federated social networks, and a recent call to action: Bring Back Blogging.</description>
      <link>http://tbeseda.com/articles/2022/12/hello-world</link>
      <guid isPermaLink="false">http://tbeseda.com/articles/2022/12/hello-world</guid>
      <category>Articles</category>
      <dc:creator>Taylor Beseda</dc:creator>
      <pubDate>Sat, 25 Dec 2022 23:310 MST</pubDate>
      <content:encoded>
        <![CDATA[ <article-content class="">
          <h2 id="blogging-again">Blogging again</h2>
          <p>My first entry on <a href="http://tbeseda.com" rel="noopener noreferrer" target="_blank">tbeseda.com</a>. I can’t remember all the places I’ve published content, but I’m motivated to centralize it. It may not always look like this, but it will always be here.</p>
          <p>The impetus being: the tire fire that is Twitter, a move to federated social networks, and a recent call to action: <a href="https://bringback.blog/" rel="noopener noreferrer" target="_blank">Bring Back Blogging</a>.</p>
          <h3 id="varying-topics-and-content">Varying topics and content</h3>
          <p>I’m a fan of many things and a fanatic about being a fan of things.</p>
          <p>For work, I write a lot about software and the web. Docs and articles about the tools we build, standards, accessibility, new protocols, etc.</p>
          <p>I do think I will write about those topics here as they’re of great interest to me. But I hope to also publish about other interests:</p>
          <ul>
          <li>Hobbies: leatherwork, classic pickups, game design</li>
          <li>Media, film, and journalism</li>
          <li>Local (to me) issues and politics</li>
          </ul>
          <h2 id="platform">Platform</h2>
          <p>I’m deploying this handmade website to a series of AWS Lambdas (swapping to Begin soon as we roll out the new platform over there).</p>
          <p>I’ve built several dynamic web apps backed by Markdown content. So I’ve been able to re-use a lot of that knowledge. Luckily, much of that experience is encapsulated in <a href="https://github.com/architect/arcdown" rel="noopener noreferrer" target="_blank">Arcdown</a> and can be easily combined with <a href="https://enhance.dev" rel="noopener noreferrer" target="_blank">Enhance</a> to create a serverless web-publishing application.</p>
          <p>I’m keeping an eye toward web standards and accessibility. Serving fast HTML documents with progressive enhancement where desired.</p>
          <h3 id="features">Features</h3>
          <p>I’ve already mixed in IndieWeb elements, like <a href="https://indieweb.org/microformats" rel="noopener noreferrer" target="_blank">microformats</a>. This post is a <a href="https://indieweb.org/h-entry" rel="noopener noreferrer" target="_blank">h-entry</a> and I have implemented an <a href="https://indieweb.org/h-card" rel="noopener noreferrer" target="_blank">h-card</a> on my homepage and at <a href="/h-card">/h-card</a>.</p>
          <p>This screenshot is from a useful browser extension called <a href="https://chrome.google.com/webstore/detail/microformats-reader/phphllmalbniljekjimmalackdppmoif" rel="noopener noreferrer" target="_blank">Microformats Reader</a> that will inspect the current tab’s standard microformat data. Here’s the current article’s details:</p>
          <p><img src="/_public/img/articles/microformats.png" alt="a screenshot of parsed mciroformat data on this page"></p>
          <p>[<em>hmm, static assets seem to be broken in production</em>]</p>
          <p>Oh, and the favicon is a random emoji on each request. 🎲</p>
          <h4 id="code-blocks">Code blocks</h4>
          <p>I’m likely to use this site to publish code snippets and examples.</p>
          <p><em>Arcdown</em> ships with highlight.js to provide syntax highlighting for code blocks. An example:</p>
          <pre class="hljs"><code data-language="javascript"><span class="line"><span class="hljs-comment">// render some .md to HTML with Arcdown</span></span>
          <span class="line"><span class="hljs-keyword">const</span> arcdown = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Arcdown</span>({</span>
          <span class="line">	<span class="hljs-attr">pluginOverrides</span>: {</span>
          <span class="line">		<span class="hljs-attr">markdownItToc</span>: {</span>
          <span class="line">			<span class="hljs-attr">containerClass</span>: <span class="hljs-string">'toc mb2 ml-2'</span>,</span>
          <span class="line">			<span class="hljs-attr">listType</span>: <span class="hljs-string">'ul'</span>,</span>
          <span class="line">		},</span>
          <span class="line">	},</span>
          <span class="line">	<span class="hljs-attr">plugins</span>: [],</span>
          <span class="line">	<span class="hljs-attr">hljs</span>: {</span>
          <span class="line">		<span class="hljs-attr">sublanguages</span>: { <span class="hljs-attr">javascript</span>: [<span class="hljs-string">'xml'</span>, <span class="hljs-string">'css'</span>] },</span>
          <span class="line">		<span class="hljs-attr">plugins</span>: [<span class="hljs-keyword">new</span> <span class="hljs-title class_">HljsLineWrapper</span>({ <span class="hljs-attr">className</span>: <span class="hljs-string">'line'</span> })],</span>
          <span class="line">	},</span>
          <span class="line">})</span>
          <span class="line"></span>
          <span class="line"><span class="hljs-keyword">const</span> articleMd = <span class="hljs-title function_">readFileSync</span>(<span class="hljs-string">'./hello-world.md'</span>, <span class="hljs-string">'utf-8'</span>)</span>
          <span class="line"><span class="hljs-keyword">const</span> article = <span class="hljs-keyword">await</span> arcdown.<span class="hljs-title function_">render</span>(articleMd)</span></code></pre>
          <h3 id="todo%3A-rss%2C-more-indieweb%2C-activitypub">Todo: RSS, more IndieWeb, ActivityPub</h3>
          <p>RSS has to be done. Like yesterday.</p>
          <p>More ideas:</p>
          <ul>
          <li>Photo viewer Web Component</li>
          <li><a href="https://indieweb.org/webmention" rel="noopener noreferrer" target="_blank">webmention</a> implementation</li>
          <li>A link blog. I read a ton.</li>
          <li><a href="https://indieweb.org/ActivityPub" rel="noopener noreferrer" target="_blank">ActivityPub</a> inbox/outbox</li>
          <li>a “blogroll” (remember those?!)</li>
          <li><a href="https://indieweb.org/IndieAuth" rel="noopener noreferrer" target="_blank">IndieAuth</a></li>
          <li>transfering some old, existing content</li>
          <li>article ⭐️s via Mastodon</li>
          <li><a href="https://gemini.circumlunar.space/" rel="noopener noreferrer" target="_blank">Gemini</a> could be cool</li>
          </ul>
          <p>Additionally, I’d like to have a place for hand-built web experiments (code, visualizations, games, long-form crafting guides, automotive build logs; things that don’t fit well into a <code>.md</code> file) – probably under /knowledge.</p>
          <p>It’s Christmas and Santa is likely to be here soon. So I’ll leave it at that for now.</p>
        </article-content> ]]>
      </content:encoded>
    </item>
  </channel>
</rss>
`.trim(),
	}
}
