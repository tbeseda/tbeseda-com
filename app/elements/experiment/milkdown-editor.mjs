/** @type {import('@enhance/types').EnhanceElemFn} */
export default function MilkdownEditor ({ html }) {
  return html`
<style>
  #editor {
    background-color: var(--input-background-color);
  }
  #editor .milkdown {
    border: 1px solid #ccc;
    padding: 1rem;
    white-space: pre-wrap;
  }
</style>

<h2>Milkdown Editor</h2>
<div id="editor"></div>

<script type="module">
  import { MyEditor } from '/_public/bundles/my-milkdown-editor.mjs'

  class ExperimentMilkdownEditor extends HTMLElement {
    constructor () {
      super()
      this.element = this.querySelector('#editor')
    }

    connectedCallback () {
      this.editor = new MyEditor({ element: this.element })
    }
  }

  customElements.define('experiment-milkdown-editor', ExperimentMilkdownEditor)
</script>
  `
}
