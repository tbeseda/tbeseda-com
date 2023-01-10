module.exports = {
	webmentions: [
		{
			id: 'in:foo',
			created: new Date().toISOString(),
			target: 'https://tbeseda.com/articles/1986/11/test',
			source: 'https://arc.codes/docs/en/get-started/quickstart',
			targetPath: '/articles/1986/11/test',
			sourceAuthor: 'Alice',
			sourceTitle: 'Architect',
			request: { headers: {}, body: {} },
		},
		{
			id: 'in:bar',
			created: new Date().toISOString(),
			target: 'https://tbeseda.com/articles/1986/11/test',
			source: 'https://enhance.dev/docs/',
			targetPath: '/articles/1986/11/test',
			sourceTitle: 'Enhance',
			request: { headers: {}, body: {} },
		},
		{
			id: 'in:baz',
			created: new Date().toISOString(),
			target: 'https://tbeseda.com/articles/1986/11/test',
			source: 'https://begin.com',
			targetPath: '/articles/1986/11/test',
			request: { headers: {}, body: {} },
		},
	],
}
