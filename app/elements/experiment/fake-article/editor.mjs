/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentFakeArticleEditor({ html }) {
  return html`
    <style>
      :host {
        display: block;
      }
      form.article-form {
        max-width: 44ch;
        display: grid;
        gap: 0.5rem;
        grid-template-columns: 1fr 2fr;
      }
      /* align labels to the right and input left */
      form.article-form label {
        text-align: right;
      }
      form.article-form input[type="checkbox"],
      form.article-form input[type="submit"] {
        justify-self: start;
      }
      .editor-container {
        margin-top: 2rem;
        width: 100%;
        color: #333;
        background-color: #eee;
        border-radius: .5rem;
        padding: 0.25rem;
      }
      .editor-container [contenteditable] {
        outline: none;
        padding: 0.5rem;
        min-height: 10rem;
        border-radius: 0.3rem;
        background-color: #fff;
      }
    </style>

    <h2>Fake Article Editor</h2>

    <form class="article-form" method="post">
      <label for="title">Title</label>
      <input type="text" name="title" value="">

      <label for="slug">Slug</label>
      <input type="text" name="slug" value="">

      <label for="description">Description</label>
      <textarea name="description"></textarea>

      <label for="date">Date</label>
      <input type="date" name="date" value="">

      <label for="published">Published</label>
      <input type="checkbox" name="published" value="1">

      <label for="save"></label>
      <input type="submit" name="save" value="Save">

      <input type="hidden" name="content" value="">
    </form>

    <div class="editor-container"></div>

    <p>
      This is a custom instance of the Tiptap editor.<br>
      You can use Markdown shortcuts for formatting: <code>#</code> to create a heading.<br>
      Keyboard shortcuts are also available: <kbd>⌘</kbd> + <kbd>B</kbd> to make text bold.
    </p>

    <script type="module">
      import { MyEditor } from '/_public/bundles/my-tiptap-editor.mjs'

      class ExperimentFakeArticleEditor extends HTMLElement {
        constructor() {
          super()
          this.container = this.querySelector('.editor-container')
          this.form = this.querySelector('form.article-form')
          this.titleInput = this.querySelector('input[name="title"]')
          this.slugInput = this.querySelector('input[name="slug"]')
          this.contentInput = this.querySelector('input[name="content"]')
        }

        connectedCallback() {
          this.editor = new MyEditor({
            element: this.container,
            content: 'Write something here...',
          })

          this.titleInput.addEventListener('input', (e) => {
            const slug = e.target.value
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-') // remove invalid chars
              .replace(/^-+|-+$/g, '') // trim leading & trailing dashes
            this.slugInput.value = slug
          })

          this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            const json = this.editor.getJSON()
            this.contentInput.value = JSON.stringify(json)
            this.form.submit()
          })
        }
      }

      customElements.define('experiment-fake-article-editor', ExperimentFakeArticleEditor)
    </script>
  `
}
