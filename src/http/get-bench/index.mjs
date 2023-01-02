import arc from '@architect/functions'
import { articleFromPath } from '@architect/views/lib/articles-data.mjs'

async function http(request) {
	const article = articleFromPath('/articles/2022/12/hello-world')
	return {
		html: `
<html>
  <head>
    <title>${article.title}</title>
  </head>
  <body>
    ${article.html}
  </body>
</html>
    `,
	}
}

export const handler = arc.http.async(http)
