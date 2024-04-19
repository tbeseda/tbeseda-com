/** @type {import('@enhance/types').EnhanceElemFn} */
export default function QuillEditor({ html }) {
  return html`
<style>
  #editor {
    background-color: var(--input-background-color);
  }
  #editor {
    padding: 1rem;
  }
</style>

<h2>Quill v2 Editor</h2>
<form method="post">
  <div id="editor">

  <h3>aww yeah</h3><pre data-language="javascript">
  handleSubmit (event) {
    event.preventDefault()
    const content = this.editor.quill.getSemanticHTML()
    console.log(&#39;Saving content:&#39;, content)
  }
  </pre><blockquote>nice</blockquote>

  </div>
  <button type="submit">Save</button>
</form>


<script type="module">
  import { MyEditor } from '/_public/bundles/my-quill-editor.mjs'

  class ExperimentQuillEditor extends HTMLElement {
    constructor () {
      super()
      this.element = this.querySelector('#editor')
      this.form = this.querySelector('form')
    }

    connectedCallback () {
      this.editor = new MyEditor({ element: this.element })
      this.form.addEventListener('submit', this.handleSubmit.bind(this))
    }

    handleSubmit (event) {
      event.preventDefault()
      const content = this.editor.quill.getSemanticHTML()
      console.log('Saving content:', content)
    }
  }

  customElements.define('experiment-quill-editor', ExperimentQuillEditor)
</script>
  `
}
