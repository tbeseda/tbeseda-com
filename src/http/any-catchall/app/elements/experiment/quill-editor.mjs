/** @type {import('@enhance/types').EnhanceElemFn} */
export default function QuillEditor({ html }) {
  return html`
<style>
  #editor {
    background-color: var(--input-background-color);
    padding: 1rem;
    margin-bottom: 0.5rem;
  }
  form {
    margin-bottom: 1.5rem;
  }
</style>

<h2>Quill v2 Editor</h2>
<form method="post">
  <div id="editor">

  <h2>Heading 2</h2>
  <p>Quisque sagittis dolor sed mi consectetur, quis consectetur est posuere. Pellentesque id lectus nulla. Curabitur volutpat sed quam vitae feugiat. Vestibulum orci augue, interdum commodo sapien at, interdum cursus dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean a risus in nulla mollis gravida sed nec eros. In consectetur est id faucibus tempor.</p>
  <h3>Heading 3</h3>
  <h4>Code</h4>
  <pre data-language="javascript">import hljs from 'highlight.js'
import Quill from 'quill'

export class MyEditor {
  constructor({ element }) {
    if (!element) throw new Error('No element provided')

    const toolbarOptions = [
      ['bold', 'italic', 'strike'], // toggled buttons
      [{ header: [3, 4, 5, 6, false] }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      ['clean'], // remove formatting button
    ]

    this.quill = new Quill(element, {
      theme: 'snow',
      modules: {
        syntax: { hljs },
        toolbar: toolbarOptions,
      },
    })
  }
}</pre>
  <h4>A block quote</h4>
  <blockquote>Ոչ ոք չի սիրում ցավը հենց այդպիսին, ոչ ոք չի փնտրում այն և չի տենչում հենց նրա համար, որ դա ցավ է...</blockquote>
  <h4>Lists</h4>
  <ul><li data-list="unchecked">check box</li></ul>
  <ul><li data-list="checked">done</li></ul>
  <ul><li>bullets</li></ul>
  <ol><li>numbers</li></ol>
  <p></p>

  </div>
  <button type="submit">Save</button>
</form>

<h3>Output <small>(click Save)</small>: </h3>
<article id="output"></article>

<script type="module">
  import { MyEditor } from '/_public/bundles/my-quill-editor.mjs'

  class ExperimentQuillEditor extends HTMLElement {
    constructor () {
      super()
      this.element = this.querySelector('#editor')
      this.form = this.querySelector('form')
      this.output = this.querySelector('#output')
    }

    connectedCallback () {
      this.editor = new MyEditor({ element: this.element })
      this.form.addEventListener('submit', this.handleSubmit.bind(this))
    }

    handleSubmit (event) {
      event.preventDefault()
      const content = this.editor.quill.getSemanticHTML()
      this.output.innerHTML = content
    }
  }

  customElements.define('experiment-quill-editor', ExperimentQuillEditor)
</script>
  `
}
