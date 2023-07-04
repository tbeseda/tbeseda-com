import { Renderer, AddBreaksToEmptyTextblocks } from 'pm2html'
import { getSchema } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

const schema = getSchema([StarterKit])

export const renderer = new Renderer({
	schema,
	transformers: [new AddBreaksToEmptyTextblocks()],
})
