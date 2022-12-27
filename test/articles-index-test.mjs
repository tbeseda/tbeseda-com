import test from 'tape'
import plugin from '../src/plugins/create-articles-index.js'

test('articles indexing', async (t) => {
	t.ok(plugin, 'plugin is defined')
	await plugin.sandbox.start()
})
