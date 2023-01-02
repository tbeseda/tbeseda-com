import test from 'tape'
import plugin from '../src/plugins/render-articles/index.js'

test('articles indexing', async (t) => {
	t.ok(plugin, 'plugin is defined')
	await plugin.sandbox.start()
})
