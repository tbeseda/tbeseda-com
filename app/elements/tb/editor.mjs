/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbEditor({ html, state: { store } }) {
	return html`
		<style>
			:host {
				display: block;
			}
			.editor-container {
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
			.editor-controls {
				margin-top: 1rem;
				display: flex;
				gap: 0.5rem;
				justify-content: flex-end;
			}
			kbd {
				display: inline-block;
				min-width: 0.75rem;
				margin: 0 0.2rem;
				padding: 0.2rem 0.3rem 0.1rem;
				border: 1px solid rgb(204, 204, 204);
				border-radius: 0.25rem;
				font-size: 0.8rem;
				line-height: 1;
				color: #333;
				background-color: #eee;
				text-shadow: 0 1px 0 #fff;
			}
		</style>

		<p>
			The editor below is a custom instance of the TipTap editor.<br>
			You can use Markdown shortcuts for formatting. Like <code>#</code> to create a heading.
			Keyboard shortcuts are also available. Like <kbd>⌘</kbd> + <kbd>B</kbd> to make text bold.
		</p>

		<div class="editor-container"></div>
		<div class="editor-controls">
			<button class="control-json">Get JSON Output</button>
		</div>
		<div class="editor-json">
			<pre class="hljs"><code data-language="json"></code></pre>
		</div>

		<script type="module">
			import { MyEditor } from '/_public/browser/my-tiptap-editor.mjs'

			class TbEditor extends HTMLElement {
				constructor() {
					super()
					this.container = this.querySelector('.editor-container')
					this.jsonButton = this.querySelector('.control-json')
					this.jsonContainer = this.querySelector('.editor-json pre code')
				}

				connectedCallback() {
					this.editor = new MyEditor({
						element: this.container,
						content: '${JSON.stringify(store.content)}',
					})

					this.jsonButton.addEventListener('click', () => {
						const json = this.editor.getJSON()
						this.jsonContainer.innerHTML = JSON.stringify(json, null, 2)
					})
				}
			}

			customElements.define('tb-editor', TbEditor)
		</script>
	`
}
