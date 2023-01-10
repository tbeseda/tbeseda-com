module.exports = {
	webmentions: [
		{
			id: 'foo',
			target: 'https://tbeseda.com/articles/1986/11/test',
			source: 'https://arc.codes/docs/en/get-started/quickstart',
			targetPath: '/articles/1986/11/test',
			request: { headers: {}, body: {} },
		},
		{
			id: 'bar',
			target: 'https://tbeseda.com/articles/1986/11/test',
			source: 'https://enhance.dev/docs/',
			targetPath: '/articles/1986/11/test',
			request: { headers: {}, body: {} },
		},
	],
}
