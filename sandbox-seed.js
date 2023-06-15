module.exports = {
	things: [
		{
			key: 'my-aqi',
			airNowData: [
				{
					AQI: 58,
					Category: {
						Name: 'Moderate',
						Number: 2,
					},
					DateObserved: '2023-06-08 ',
					HourObserved: 10,
					LocalTimeZone: 'MST',
					ParameterName: 'O3',
					ReportingArea: 'Denver-Boulder',
					StateCode: 'CO',
				},
				{
					AQI: 23,
					Category: {
						Name: 'Good',
						Number: 1,
					},
					DateObserved: '2023-06-08 ',
					HourObserved: 10,
					LocalTimeZone: 'MST',
					ParameterName: 'PM2.5',
					ReportingArea: 'Denver-Boulder',
					StateCode: 'CO',
				},
				{
					AQI: 27,
					Category: {
						Name: 'Good',
						Number: 1,
					},
					DateObserved: '2023-06-08 ',
					HourObserved: 10,
					LocalTimeZone: 'MST',
					ParameterName: 'PM10',
					ReportingArea: 'Denver-Boulder',
					StateCode: 'CO',
				},
			],
			iqAirData: {
				data: {
					city: 'Longmont',
					country: 'USA',
					current: {
						pollution: {
							aqicn: 1,
							aqius: 4,
							maincn: 'p2',
							mainus: 'p2',
							ts: '2023-06-08T17:00:00.000Z',
						},
						weather: {
							hu: 48,
							ic: '01d',
							pr: 1014,
							tp: 22,
							ts: '2023-06-08T17:00:00.000Z',
							wd: 70,
							ws: 2.06,
						},
					},
					location: {
						type: 'Point',
					},
					state: 'Colorado',
				},
				status: 'success',
			},
		},
		{
			key: 'vrite:content:123abc',
			canonicalLink: 'https://begin.com/blog/posts/2023-06-06-dbaas-in-lambda',
			content: {
				content: [
					{
						content: [
							{
								text: 'The last couple years have seen the rise of third party database providers, Database as a Service (DBaaS).',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: 'Instead of hosting your database on the same box as your primary application server, developers can use an external db host.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: 'Often called "serverless" databases, these offerings offload the responsibility of maintaining a database appliance.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: 'Providers also often offer useful dashboards, data browsing, branching, schema versioning, and more.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						attrs: {
							level: 2,
						},
						content: [
							{
								text: 'Selecting a Database',
								type: 'text',
							},
						],
						type: 'heading',
					},
					{
						content: [
							{
								text: 'When adding a data layer to any application, choosing a database type, engine, and, now, provider is an important choice.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						attrs: {
							level: 3,
						},
						content: [
							{
								text: 'Database Paradigm + Speed',
								type: 'text',
							},
						],
						type: 'heading',
					},
					{
						content: [
							{
								text: 'Probably the most important factor when choosing a database is deciding on "relational" tables like SQL or "document" storage, often called NoSQL.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: "But for this experiment, we'll set that aside and focus on the second most important consideration: access speed.",
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: "Specifically, we'll look at how fast the simplest queries are from a Lambda (deployed to AWS with the vanilla Node.js runtime) to various third party db vendors.",
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						attrs: {
							level: 2,
						},
						content: [
							{
								text: 'The Tests',
								type: 'text',
							},
						],
						type: 'heading',
					},
					{
						content: [
							{
								text: "I've created an ",
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {
											class: null,
											href: 'https://arc.codes',
											target: '_blank',
										},
										type: 'link',
									},
								],
								text: 'Architect',
								type: 'text',
							},
							{
								text: " application (hosted on Begin) that's made up of several functions: one for testing each provider and one to provide a web view of embedded ",
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'code',
									},
								],
								text: '<iframes>',
								type: 'text',
							},
							{
								text: ' with the results of each.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: 'Each test implementation performs essentially the same query:',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						attrs: {
							lang: 'sql',
						},
						content: [
							{
								text: 'SELECT * FROM things',
								type: 'text',
							},
						],
						type: 'codeBlock',
					},
					{
						content: [
							{
								text: 'The code and more technical explanation is available on ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {
											class: null,
											href: 'https://awaken-un3.begin.app/',
											target: '_blank',
										},
										type: 'link',
									},
								],
								text: 'the actual test page',
								type: 'text',
							},
							{
								text: ':',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						attrs: {
							alt: 'sample data',
							src: 'https://assets.vrite.io/648a405da2da16eedd81ef95/cZ1CBRoHvvOzzSboefT6f.png',
							width: '100%',
						},
						type: 'image',
					},
					{
						attrs: {
							level: 3,
						},
						content: [
							{
								text: 'Sampled Speeds',
								type: 'text',
							},
						],
						type: 'heading',
					},
					{
						content: [
							{
								text: '| Provider | Driver | Approx. Query Time |',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: '|---|---|---|',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: '| ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {
											class: null,
											href: 'https://neon.tech',
											target: '_blank',
										},
										type: 'link',
									},
								],
								text: 'Neon',
								type: 'text',
							},
							{
								text: ' ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'superscript',
									},
								],
								text: '1',
								type: 'text',
							},
							{
								text: ' | ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'code',
									},
								],
								text: 'postgres',
								type: 'text',
							},
							{
								text: ' | 300ms |',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: '| | ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'code',
									},
								],
								text: '@neondatabase/serverless',
								type: 'text',
							},
							{
								text: ' | 100ms |',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: '| ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {
											class: null,
											href: 'https://supabase.com',
											target: '_blank',
										},
										type: 'link',
									},
								],
								text: 'Supabase',
								type: 'text',
							},
							{
								text: ' ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'superscript',
									},
								],
								text: '2',
								type: 'text',
							},
							{
								text: ' | ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'code',
									},
								],
								text: 'postgres',
								type: 'text',
							},
							{
								text: ' | 450ms |',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: '| | REST API via ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'code',
									},
								],
								text: 'fetch',
								type: 'text',
							},
							{
								text: ' | ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'highlight',
									},
								],
								text: '25',
								type: 'text',
							},
							{
								text: ' - 375ms |',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: '| ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {
											class: null,
											href: 'https://planetscale.com',
											target: '_blank',
										},
										type: 'link',
									},
								],
								text: 'PlanetScale',
								type: 'text',
							},
							{
								text: ' | ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'code',
									},
								],
								text: 'mysql2',
								type: 'text',
							},
							{
								text: ' | 125ms |',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: '| | ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'code',
									},
								],
								text: '@planetscale/database',
								type: 'text',
							},
							{
								text: ' | ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'highlight',
									},
								],
								text: '25',
								type: 'text',
							},
							{
								text: ' - 150ms |',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: '| ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {
											class: null,
											href: 'https://mongodb.com',
											target: '_blank',
										},
										type: 'link',
									},
								],
								text: 'MongoDB',
								type: 'text',
							},
							{
								text: ' | ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'code',
									},
								],
								text: 'mongodb',
								type: 'text',
							},
							{
								text: ' | 725ms |',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: '| ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {
											class: null,
											href: 'https://aws.amazon.com/dynamodb/',
											target: '_blank',
										},
										type: 'link',
									},
								],
								text: 'DynamoDB',
								type: 'text',
							},
							{
								text: ' | ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'code',
									},
								],
								text: '@architect/functions',
								type: 'text',
							},
							{
								text: ' | ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'highlight',
									},
								],
								text: '10',
								type: 'text',
							},
							{
								text: 'ms |',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								type: 'hardBreak',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'superscript',
									},
								],
								text: '1',
								type: 'text',
							},
							{
								text: ' This does not include the cold start.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: 'The "wake" time can exceed 5s (5,000ms), but once active is 0.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: 'Neon is in early access and is working on various (paid) ways to manage this penalty.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								marks: [
									{
										attrs: {},
										type: 'superscript',
									},
								],
								text: '2',
								type: 'text',
							},
							{
								text: " Supabase's ",
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'code',
									},
								],
								text: '@supabase/supabase-js',
								type: 'text',
							},
							{
								text: " was not tested as it requires a build step on install (my CD environment, Lambda, doesn't have node-gyp).",
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: 'I expect it would perform similarly to their REST API.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						attrs: {
							level: 3,
						},
						content: [
							{
								text: 'Regional Differences',
								type: 'text',
							},
						],
						type: 'heading',
					},
					{
						content: [
							{
								text: 'The above sampling is for tests where the database provider is ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'italic',
									},
								],
								text: 'always',
								type: 'text',
							},
							{
								text: ' in a different US region from the Lambdas that connect to them.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: 'The only provider sharing a region with the Lambda is Dynamo since both resources will naturally be created in the same AWS region.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								marks: [
									{
										attrs: {},
										type: 'bold',
									},
								],
								text: 'All providers get a significant speed boost',
								type: 'text',
							},
							{
								text: ' when in the same region as your Lambda and using the "native" driver.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: 'For example, when both Lambda and Supabase are in ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'code',
									},
								],
								text: 'us-east-1',
								type: 'text',
							},
							{
								text: ', the same query with ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {},
										type: 'code',
									},
								],
								text: 'postgres',
								type: 'text',
							},
							{
								text: ' takes ~50ms: 9x faster 🔥',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: '(Limited tests were conducted in shared regions but are not demonstrated live.)',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						attrs: {
							level: 3,
						},
						content: [
							{
								text: 'Considerations',
								type: 'text',
							},
						],
						type: 'heading',
					},
					{
						content: [
							{
								text: 'These tests do not:',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								content: [
									{
										content: [
											{
												text: 'attempt to pool or keep-alive connections',
												type: 'text',
											},
										],
										type: 'paragraph',
									},
								],
								type: 'listItem',
							},
							{
								content: [
									{
										content: [
											{
												text: 'snapshot results or track variance over time',
												type: 'text',
											},
										],
										type: 'paragraph',
									},
								],
								type: 'listItem',
							},
							{
								content: [
									{
										content: [
											{
												text: 'test subsequent queries',
												type: 'text',
											},
										],
										type: 'paragraph',
									},
								],
								type: 'listItem',
							},
							{
								content: [
									{
										content: [
											{
												text: 'use a large dataset or a variety of DB operations',
												type: 'text',
											},
										],
										type: 'paragraph',
									},
								],
								type: 'listItem',
							},
							{
								content: [
									{
										content: [
											{
												text: 'thoroughly consider resource regions',
												type: 'text',
											},
										],
										type: 'paragraph',
									},
								],
								type: 'listItem',
							},
						],
						type: 'bulletList',
					},
					{
						attrs: {
							level: 2,
						},
						content: [
							{
								text: 'Conclusions',
								type: 'text',
							},
						],
						type: 'heading',
					},
					{
						content: [
							{
								text: "Not surprisingly, AWS's own DynamoDB is the fastest way to query data from a Lambda-based application.",
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: "Its repeatable 10ms query latency is 2.5 times better than the closest competitor's best results.",
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: "We acknowledge that it may be intimidating to get started with a NoSQL database, and that's why we provide ",
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {
											class: null,
											href: 'https://www.npmjs.com/package/@begin/data',
											target: '_blank',
										},
										type: 'link',
									},
								],
								text: '`@begin/data`',
								type: 'text',
							},
							{
								text: ' as an abstraction layer on top of DynamoDB.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: 'For folks who want to learn more about DynamoDB we recommend ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {
											class: null,
											href: 'https://www.dynamodbbook.com/',
											target: '_blank',
										},
										type: 'link',
									},
								],
								text: "Alex DeBrie's The DynamoDB Book",
								type: 'text',
							},
							{
								text: '.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: 'That said, all tested provider queries are less than half a second (except MongoDB - however, their paid tiers do reach that 500ms threshold)!',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: 'Ultimately any database is better than no database.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								text: "Don't be paralyzed or resort to throwing the kitchen sink at the problem. Pick one and get to building the initial implementation.",
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						content: [
							{
								type: 'hardBreak',
							},
						],
						type: 'paragraph',
					},
				],
				type: 'doc',
			},
			contentGroupId: '648a4065a2da16eedd81ef9c',
			coverAlt: '',
			coverUrl:
				'https://assets.vrite.io/648a405da2da16eedd81ef95/SX86EFmCyrX59NZ6f3itP.jpeg',
			coverWidth: '100%',
			date: '2023-06-06T22:37:58.720Z',
			description:
				'Third party database providers speed-tested on AWS Lambda. Compare performance with DynamoDB in real time with our sample application.',
			id: '648a407ea2da16eedd81ef9d',
			locked: true,
			members: [
				{
					id: '648a405da2da16eedd81ef99',
					profile: {
						avatar:
							'https://assets.vrite.io/648a405da2da16eedd81ef95/5bRmAmx6WdQXcCeBkA1iD.jpeg',
						email: 'tbeseda@gmail.com',
						fullName: 'Taylor Beseda',
						id: '648a405da2da16eedd81ef93',
						username: 'tbeseda',
					},
				},
			],
			slug: 'tested-database-providers-on-lambda',
			tags: [],
			title: 'Tested: Database Providers on Lambda',
		},
	],
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
