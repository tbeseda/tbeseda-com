import { Editor } from '@tiptap/core'
import Highlight from '@tiptap/extension-highlight'
import Img from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Superscript from '@tiptap/extension-superscript'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import StarterKit from '@tiptap/starter-kit'

export class MyEditor extends Editor {
  constructor ({
    element,
    extensions = [
      StarterKit,
      Highlight,
      Img.configure({
        allowBase64: true,
      }),
      Link.configure({
        HTMLAttributes: {
          target: '_blank',
        },
      }),
      Superscript,
      Table,
      TableCell,
      TableHeader,
      TableRow,
    ],
    content,
  }) {
    if (!element) throw new Error('No element provided')
    super({
      element,
      extensions,
      content,
      editorProps: {
        // helpful: https://www.codemzy.com/blog/tiptap-drag-drop-image
        handleDrop (view, event, slice, moved) {
          if (
            !moved &&
            event.dataTransfer &&
            event.dataTransfer.files &&
            event.dataTransfer.files[0]
          ) {
            const file = event.dataTransfer.files[0]
            const fileSize = Number((file.size / 1024 / 1024).toFixed(4))

            if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
              window.alert('jpg or png')
              return true
            }
            if (fileSize > 10) {
              window.alert('less than 10MB')
              return true
            }

            const img = new window.Image()
            img.src = URL.createObjectURL(file)
            img.onload = function () {
              if (img.width > 5000 || img.height > 5000) {
                window.alert('less than 5000px wide and tall')
              } else {
                // upload and get URL
                const form = new FormData()
                form.set('image', file)
                fetch('/sekret/blog/image', {
                  method: 'POST',
                  body: form,
                }).then((res) => {
                  if (res.ok) {
                    res.json().then(({ newFileName }) => {
                      console.log('newFileName', newFileName)
                      const url = `/_public/.uploaded-images/${newFileName}`
                      const { schema } = view.state
                      const coordinates = view.posAtCoords({
                        left: event.clientX,
                        top: event.clientY,
                      })
                      const node = schema.nodes.image.create({ src: url })
                      const transaction = view.state.tr.insert(
                        coordinates?.pos || 0,
                        node,
                      )
                      return view.dispatch(transaction)
                    })
                  }
                })
              }
            }

            return true
          }
          return false
        },
      },
    })
  }
}
