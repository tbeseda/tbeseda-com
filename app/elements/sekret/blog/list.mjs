/** @type {import('@enhance/types').EnhanceElemFn} */
export default function SekretBlogList({ html, state: { store } }) {
  const { articles = [] } = store

  return html`
    <style>
      :host {
        display: block;
      }
    </style>

    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Published</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      ${articles
        .map(
          (article) => /* html */ `
        <tr>
          <td>
            <strong>${article.title}</strong>
            <p>${article.description}</p>
          </td>
          <td>
            <input type="checkbox" disabled ${article.published ? 'checked' : ''}>
          </td>
          <td>${article.date}</td>
          <td>
            <form action="/sekret/blog/editor">
              <input type="hidden" name="articleID" value="${article.articleID}">
              <button type="submit" formmethod="get">Edit</button>
              <button type="submit" formmethod="post" name="action" value="destroy">Delete</button>
            </form>
          </td>
        </tr>
        `,
        )
        .join('')}
        ${
          articles.length === 0
            ? /* html */ `
        <tr>
          <td colspan="5" style="text-align: center;">No articles found.</td>
        </tr>`
            : ''
        }
      </tbody>
    </table>

    <script type="module">
      class SekretBlogList extends HTMLElement {
        constructor() {
          super()
          this.destroyButtons = this.querySelectorAll('button[value="destroy"]')
        }

        connectedCallback() {
          this.destroyButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
              const okay = confirm('Sure you want to delete?')
              if (!okay) event.preventDefault()
            })
          })
        }
      }

      customElements.define('sekret-blog-list', SekretBlogList)
    </script>
  `
}
