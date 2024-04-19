import hljs from 'highlight.js'
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
}
