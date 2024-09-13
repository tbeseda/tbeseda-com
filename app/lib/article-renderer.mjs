import { toHTML } from '@portabletext/to-html'
import imageUrlBuilder from '@sanity/image-url'
import { client as sanityClient } from './sanity-client.mjs'

const builder = imageUrlBuilder(sanityClient)

export function renderArticle(article) {
  const rendered = toHTML(article.content, {
    components: {
      types: {
        image: ({ value }) => {
          return `
            <figure>
              <img src="${builder.image(value).url()}" alt="${value.alt}" />
              <figcaption>${value.caption}</figcaption>
            </figure>
          `.trim()
        },
        code: ({ value }) => {
          const code = value.code
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;')
          return `
            <pre><code>${code}</code></pre>
          `.trim()
        },
      },
    },
  })
  return rendered
}
