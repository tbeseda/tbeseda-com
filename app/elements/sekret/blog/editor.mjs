/** @type {import('@enhance/types').EnhanceElemFn} */
export default function SekretBlogEditor({ html, state: { store } }) {
	const { article = {} } = store

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
				box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
			}
		</style>

		<h2>New Blog Post</h2>

		<form class="article-form" action="/sekret/blog" method="post">
			<label for="title">ID</label>
			<input
				type="text"
				name="articleID"
				value="${article.articleID}"
				placeholder="Leave blank for new article"
			>

			<label for="title">Title</label>
			<input type="text" name="title" value="${article.title}">

			<label for="slug">Slug</label>
			<input type="text" name="slug" value="${article.slug}">

			<label for="description">Description</label>
			<textarea name="description">${article.description}</textarea>

			<label for="date">Date</label>
			<input type="date" name="date" value="${article.date}">

			<label for="published">Published</label>
			<input
				type="checkbox"
				name="published"
				${article.published ? 'checked' : ''}
			>

			<label for="save"></label>
			<input type="submit" name="save" value="Save">

			<input type="hidden" name="content">
		</form>

		<div class="editor-container"></div>

		<script type="module">
			import { MyEditor } from '/_public/browser/my-tiptap-editor.mjs'

			class SekretBlogEditor extends HTMLElement {
				constructor() {
					super()
					this.container = this.querySelector('.editor-container')
					this.form = this.querySelector('form.article-form')
					this.titleInput = this.querySelector('input[name="title"]')
					this.slugInput = this.querySelector('input[name="slug"]')
					this.contentInput = this.querySelector('input[name="content"]')
				}

				connectedCallback() {
					const content = ${JSON.stringify(article.doc) || 'false'}

					this.editor = new MyEditor({
						element: this.container,
						content: content || 'Write something...',
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

			customElements.define('sekret-blog-editor', SekretBlogEditor)
		</script>
	`
}
