module.exports = {
	events: {
		'webmention-receive': {
			vaild: {
				headers: {},
				body: {
					source: 'https://webmention.rocks/test/4', // has h-entry.author
					// target would normally be tbeseda.com
					target: 'https://webmention.rocks/test/4', // contains a link to itself
				},
			},
			invalid: {
				headers: {},
				body: {
					source: 'https://webmention.rocks/test/4',
					target: 'https://tbeseda.com/articles/1986/11/test',
				},
			},
		},
	},
}
