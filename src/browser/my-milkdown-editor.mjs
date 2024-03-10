import { Editor, rootCtx } from '@milkdown/core'
import { commonmark } from '@milkdown/preset-commonmark'

export class MyEditor {
  constructor({ element }) {
    if (!element) throw new Error('No element provided')

    this.editor = Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, element)
      })
      .use(commonmark)
      .create()

    this.editor.then((editor) => {
      console.log('Editor created', editor)
    })
  }
}
