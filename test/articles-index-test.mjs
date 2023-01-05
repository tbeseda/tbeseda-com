import test from 'tape'
import plugin from '../src/plugins/render-articles/index.js'

// TODO: actually test that the articles are rendered

test('rendering articles', async (t) => {
	t.ok(plugin, 'plugin is defined')
	await plugin.sandbox.start()
})
