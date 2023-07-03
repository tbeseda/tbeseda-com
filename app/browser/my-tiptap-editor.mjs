import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

export class MyEditor extends Editor {
	constructor({ element, extensions = [StarterKit], content }) {
		if (!element) throw new Error('No element provided')
		super({
			element,
			extensions,
			content,
		})
	}
}
