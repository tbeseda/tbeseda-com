import { Editor } from '@tiptap/core'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import Superscript from '@tiptap/extension-superscript'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

export class MyEditor extends Editor {
	constructor({
		element,
		extensions = [
			StarterKit,
			Highlight,
			Image.configure({
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
		})
	}
}
