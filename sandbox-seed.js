module.exports = {
	things: [
		{
			key: 'my-aqi',
			type: 'aqi',
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
			key: 'vrite:content:Published:648a407ea2da16eedd81ef9d',
			type: 'vrite:content',
			canonicalLink: 'https://begin.com/blog/posts/2023-06-06-dbaas-in-lambda',
			content: {
				type: 'doc',
				content: [
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'The last couple years have seen the rise of third party database providers, Database as a Service (DBaaS).',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'Instead of hosting your database on the same box as your primary application server, developers can use an external db host.',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'Often called "serverless" databases, these offerings offload the responsibility of maintaining a database appliance.',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'Providers also often offer useful dashboards, data browsing, branching, schema versioning, and more.',
							},
						],
					},
					{
						type: 'heading',
						content: [
							{
								type: 'text',
								text: 'Selecting a Database',
							},
						],
						attrs: {
							level: 2,
						},
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'When adding a data layer to any application, choosing a database type, engine, and, now, provider is an important choice.',
							},
						],
					},
					{
						type: 'heading',
						content: [
							{
								type: 'text',
								text: 'Database Paradigm + Speed',
							},
						],
						attrs: {
							level: 3,
						},
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'Probably the most important factor when choosing a database is deciding on "relational" tables like SQL or "document" storage, often called NoSQL.',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: "But for this experiment, we'll set that aside and focus on the second most important consideration: access speed.",
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: "Specifically, we'll look at how fast the simplest queries are from a Lambda (deployed to AWS with the vanilla Node.js runtime) to various third party db vendors.",
							},
						],
					},
					{
						type: 'heading',
						content: [
							{
								type: 'text',
								text: 'The Tests',
							},
						],
						attrs: {
							level: 2,
						},
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: "I've created an ",
							},
							{
								type: 'text',
								text: 'Architect',
								marks: [
									{
										type: 'link',
										attrs: {
											class: null,
											href: 'https://arc.codes',
											target: '_blank',
										},
									},
								],
							},
							{
								type: 'text',
								text: " application (hosted on Begin) that's made up of several functions: one for testing each provider and one to provide a web view of embedded ",
							},
							{
								type: 'text',
								text: '<iframes>',
								marks: [
									{
										type: 'code',
										attrs: {},
									},
								],
							},
							{
								type: 'text',
								text: ' with the results of each.',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'Each test implementation performs essentially the same query:',
							},
						],
					},
					{
						type: 'codeBlock',
						content: [
							{
								type: 'text',
								text: 'SELECT * FROM things',
							},
						],
						attrs: {
							lang: 'sql',
						},
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'The code and more technical explanation is available on ',
							},
							{
								type: 'text',
								text: 'the actual test page',
								marks: [
									{
										type: 'link',
										attrs: {
											class: null,
											href: 'https://awaken-un3.begin.app/',
											target: '_blank',
										},
									},
								],
							},
							{
								type: 'text',
								text: ':',
							},
						],
					},
					{
						type: 'image',
						attrs: {
							alt: 'sample data',
							width: '100%',
							src: 'https://assets.vrite.io/648a405da2da16eedd81ef95/cZ1CBRoHvvOzzSboefT6f.png',
						},
					},
					{
						type: 'heading',
						content: [
							{
								type: 'text',
								text: 'Sampled Speeds',
							},
						],
						attrs: {
							level: 3,
						},
					},
					{
						type: 'table',
						content: [
							{
								type: 'tableRow',
								content: [
									{
										type: 'tableHeader',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: 'Provider',
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableHeader',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: 'Driver',
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableHeader',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: 'Approx. Query Time',
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
								],
							},
							{
								type: 'tableRow',
								content: [
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: 'Neon',
														marks: [
															{
																type: 'link',
																attrs: {
																	class: null,
																	href: 'https://neon.tech',
																	target: '_blank',
																},
															},
														],
													},
													{
														type: 'text',
														text: ' ',
													},
													{
														type: 'text',
														text: '1',
														marks: [
															{
																type: 'superscript',
																attrs: {},
															},
														],
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: 'postgres',
														marks: [
															{
																type: 'code',
																attrs: {},
															},
														],
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: '300ms',
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
								],
							},
							{
								type: 'tableRow',
								content: [
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: '@neondatabase/serverless',
														marks: [
															{
																type: 'code',
																attrs: {},
															},
														],
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: '100ms',
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
								],
							},
							{
								type: 'tableRow',
								content: [
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: 'Supabase',
														marks: [
															{
																type: 'link',
																attrs: {
																	class: null,
																	href: 'https://supabase.com',
																	target: '_blank',
																},
															},
														],
													},
													{
														type: 'text',
														text: ' ',
													},
													{
														type: 'text',
														text: '2',
														marks: [
															{
																type: 'superscript',
																attrs: {},
															},
														],
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: 'postgres',
														marks: [
															{
																type: 'code',
																attrs: {},
															},
														],
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: '450ms',
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
								],
							},
							{
								type: 'tableRow',
								content: [
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: 'REST API via ',
													},
													{
														type: 'text',
														text: 'fetch',
														marks: [
															{
																type: 'code',
																attrs: {},
															},
														],
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: '25',
														marks: [
															{
																type: 'highlight',
																attrs: {},
															},
														],
													},
													{
														type: 'text',
														text: ' - 375ms',
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
								],
							},
							{
								type: 'tableRow',
								content: [
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: 'PlanetScale',
														marks: [
															{
																type: 'link',
																attrs: {
																	class: null,
																	href: 'https://planetscale.com',
																	target: '_blank',
																},
															},
														],
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: 'mysql2',
														marks: [
															{
																type: 'code',
																attrs: {},
															},
														],
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: '125ms',
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
								],
							},
							{
								type: 'tableRow',
								content: [
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: '@planetscale/database',
														marks: [
															{
																type: 'code',
																attrs: {},
															},
														],
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: '25',
														marks: [
															{
																type: 'highlight',
																attrs: {},
															},
														],
													},
													{
														type: 'text',
														text: ' - 150ms',
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
								],
							},
							{
								type: 'tableRow',
								content: [
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: 'MongoDB',
														marks: [
															{
																type: 'link',
																attrs: {
																	class: null,
																	href: 'https://mongodb.com',
																	target: '_blank',
																},
															},
														],
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: 'mongodb',
														marks: [
															{
																type: 'code',
																attrs: {},
															},
														],
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: '725ms',
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
								],
							},
							{
								type: 'tableRow',
								content: [
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: 'DynamoDB',
														marks: [
															{
																type: 'link',
																attrs: {
																	class: null,
																	href: 'https://aws.amazon.com/dynamodb/',
																	target: '_blank',
																},
															},
														],
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: '@architect/functions',
														marks: [
															{
																type: 'code',
																attrs: {},
															},
														],
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
									{
										type: 'tableCell',
										content: [
											{
												type: 'paragraph',
												content: [
													{
														type: 'text',
														text: '10',
														marks: [
															{
																type: 'highlight',
																attrs: {},
															},
														],
													},
													{
														type: 'text',
														text: 'ms',
													},
												],
											},
										],
										attrs: {
											colspan: 1,
											rowspan: 1,
										},
									},
								],
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: '1',
								marks: [
									{
										type: 'superscript',
										attrs: {},
									},
								],
							},
							{
								type: 'text',
								text: ' This does not include the cold start.',
							},
							{
								type: 'hardBreak',
							},
							{
								type: 'text',
								text: 'The "wake" time can exceed 5s (5,000ms), but once active is 0.',
							},
							{
								type: 'hardBreak',
							},
							{
								type: 'text',
								text: 'Neon is in early access and is working on various (paid) ways to manage this penalty.',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: '2',
								marks: [
									{
										type: 'superscript',
										attrs: {},
									},
								],
							},
							{
								type: 'text',
								text: " Supabase's ",
							},
							{
								type: 'text',
								text: '@supabase/supabase-js',
								marks: [
									{
										type: 'code',
										attrs: {},
									},
								],
							},
							{
								type: 'text',
								text: " was not tested as it requires a build step on install (my CD environment, Lambda, doesn't have node-gyp). ",
							},
							{
								type: 'hardBreak',
							},
							{
								type: 'text',
								text: 'I expect it would perform similarly to their REST API.',
							},
						],
					},
					{
						type: 'heading',
						content: [
							{
								type: 'text',
								text: 'Regional Differences',
							},
						],
						attrs: {
							level: 3,
						},
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'The above sampling is for tests where the database provider is ',
							},
							{
								type: 'text',
								text: 'always',
								marks: [
									{
										type: 'italic',
										attrs: {},
									},
								],
							},
							{
								type: 'text',
								text: ' in a different US region from the Lambdas that connect to them.',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'The only provider sharing a region with the Lambda is Dynamo since both resources will naturally be created in the same AWS region.',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'All providers get a significant speed boost',
								marks: [
									{
										type: 'bold',
										attrs: {},
									},
								],
							},
							{
								type: 'text',
								text: ' when in the same region as your Lambda and using the "native" driver.',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'For example, when both Lambda and Supabase are in ',
							},
							{
								type: 'text',
								text: 'us-east-1',
								marks: [
									{
										type: 'code',
										attrs: {},
									},
								],
							},
							{
								type: 'text',
								text: ', the same query with ',
							},
							{
								type: 'text',
								text: 'postgres',
								marks: [
									{
										type: 'code',
										attrs: {},
									},
								],
							},
							{
								type: 'text',
								text: ' takes ~50ms: 9x faster 🔥',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: '(Limited tests were conducted in shared regions but are not demonstrated live.)',
							},
						],
					},
					{
						type: 'heading',
						content: [
							{
								type: 'text',
								text: 'Considerations',
							},
						],
						attrs: {
							level: 3,
						},
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'These tests do not:',
							},
						],
					},
					{
						type: 'bulletList',
						content: [
							{
								type: 'listItem',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'attempt to pool or keep-alive connections',
											},
										],
									},
								],
							},
							{
								type: 'listItem',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'snapshot results or track variance over time',
											},
										],
									},
								],
							},
							{
								type: 'listItem',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'test subsequent queries',
											},
										],
									},
								],
							},
							{
								type: 'listItem',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'use a large dataset or a variety of DB operations',
											},
										],
									},
								],
							},
							{
								type: 'listItem',
								content: [
									{
										type: 'paragraph',
										content: [
											{
												type: 'text',
												text: 'thoroughly consider resource regions',
											},
										],
									},
								],
							},
						],
					},
					{
						type: 'heading',
						content: [
							{
								type: 'text',
								text: 'Conclusions',
							},
						],
						attrs: {
							level: 2,
						},
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: "Not surprisingly, AWS's own DynamoDB is the fastest way to query data from a Lambda-based application.",
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: "Its repeatable 10ms query latency is 2.5 times better than the closest competitor's best results.",
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: "We acknowledge that it may be intimidating to get started with a NoSQL database, and that's why we provide ",
							},
							{
								type: 'text',
								text: '`@begin/data`',
								marks: [
									{
										type: 'link',
										attrs: {
											class: null,
											href: 'https://www.npmjs.com/package/@begin/data',
											target: '_blank',
										},
									},
								],
							},
							{
								type: 'text',
								text: ' as an abstraction layer on top of DynamoDB.',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'For folks who want to learn more about DynamoDB we recommend ',
							},
							{
								type: 'text',
								text: "Alex DeBrie's The DynamoDB Book",
								marks: [
									{
										type: 'link',
										attrs: {
											class: null,
											href: 'https://www.dynamodbbook.com/',
											target: '_blank',
										},
									},
								],
							},
							{
								type: 'text',
								text: '.',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'That said, all tested provider queries are less than half a second (except MongoDB - however, their paid tiers do reach that 500ms threshold)!',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: 'Ultimately any database is better than no database.',
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'text',
								text: "Don't be paralyzed or resort to throwing the kitchen sink at the problem. Pick one and get to building the initial implementation.",
							},
						],
					},
					{
						type: 'paragraph',
						content: [
							{
								type: 'hardBreak',
							},
						],
					},
				],
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
		{
			key: 'vrite:content:Drafts:648e584f9106221f30798432',
			type: 'vrite:content',
			content: {
				content: [
					{
						content: [
							{
								content: [
									{
										content: [
											{
												text: 'Enhance builds on top of Architect.',
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
												text: 'Arc has some powerful (opt-in) features.',
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
												text: 'Enhance gets these features for free!',
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
												text: 'Powerful combo: Dynamo-powered cache + scheduled functions',
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
						content: [
							{
								text: 'With wildfire season well upon us in North America, it’s a good idea to keep an eye on local air quality. Let’s get some real time data from the US EPA’s AirNow program. Even with a limited API request budget, we can get snappy results by scheduling updates, caching, and refreshing data on demand. All with features already built into Enhance.',
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
								text: 'AirNow API',
								type: 'text',
							},
						],
						type: 'heading',
					},
					{
						attrs: {
							lang: 'plaintext',
						},
						content: [
							{
								text: 'https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=90210&API_KEY=ABC123',
								type: 'text',
							},
						],
						type: 'codeBlock',
					},
					{
						content: [
							{
								text: 'That’s it, that’s the URL we’ll use to request the air quality index (AQI) for any given US zip code',
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
								text: '. We get back an array of one to three measurements if a weather station is found near the requested zip code.',
								type: 'text',
							},
						],
						type: 'paragraph',
					},
					{
						attrs: {
							lang: 'javascript',
						},
						content: [
							{
								text: "{\n  AQI: 58,\n  Category: {\n    Name: 'Moderate',\n    Number: 2,\n  },\n  DateObserved: '2023-06-08 ',\n  HourObserved: 10,\n  LocalTimeZone: 'MST',\n  ParameterName: 'O3',\n  ReportingArea: 'Denver-Boulder',\n  StateCode: 'CO',\n}",
								type: 'text',
							},
						],
						type: 'codeBlock',
					},
					{
						content: [
							{
								text: 'We’ll need to keep in mind that ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {
											class: null,
											href: 'https://docs.airnowapi.org/faq#rateLimits',
											target: '_blank',
										},
										type: 'link',
									},
								],
								text: 'this API limits us to 500 requests per hour',
								type: 'text',
							},
							{
								text: ', however the docs also let us know that most datapoints are updated once each hour. So if our application caches its copy of that data for 30 min, we can query 250 unique zip codes each hour - probably a good start, at least until it goes viral 😉',
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
								text: '1',
								type: 'text',
							},
							{
								text: 'For simplicity, I’m sticking with US data, but international data is available. I recommend checking out ',
								type: 'text',
							},
							{
								marks: [
									{
										attrs: {
											class: null,
											href: 'https://api-docs.iqair.com/',
											target: '_blank',
										},
										type: 'link',
									},
								],
								text: 'IQAir',
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
						attrs: {
							level: 2,
						},
						content: [
							{
								text: 'Enhance App with DynamoDB',
								type: 'text',
							},
						],
						type: 'heading',
					},
					{
						type: 'paragraph',
					},
					{
						attrs: {
							level: 2,
						},
						content: [
							{
								text: 'Add a Scheduled Function',
								type: 'text',
							},
						],
						type: 'heading',
					},
					{
						type: 'paragraph',
					},
				],
				type: 'doc',
			},
			contentGroupId: '648a4065a2da16eedd81ef9c',
			coverUrl:
				'https://assets.vrite.io/648a405da2da16eedd81ef95/tRhlpxDBpDuF65cW4R-XJ.jpeg',
			coverWidth: '100%',
			description: '<p>work in progress</p>',
			id: '648e584f9106221f30798432',
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
			slug: 'enhance-aqi-example',
			tags: [],
			title: 'WIP: AQI Example',
			updatedAt: '2023-06-18T01:35:42.531Z',
		},
		{
			key: 'vrite:content:Ideas:648e7f6e9106221f3079843f',
			type: 'vrite:content',
			content: {
				content: [
					{
						attrs: {
							start: 1,
						},
						content: [
							{
								content: [
									{
										content: [
											{
												text: 'Roll a new Enhance app with an item for sale',
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
												text: 'Set up Stripe',
												type: 'text',
											},
										],
										type: 'paragraph',
									},
									{
										attrs: {
											start: 1,
										},
										content: [
											{
												content: [
													{
														content: [
															{
																text: 'Product with payment link in Test Mode. Copy.',
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
																text: 'Endpoints for confirmation.',
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
																text: 'Duplicate to Production Mode.',
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
																text: 'Copy the keys.',
																type: 'text',
															},
														],
														type: 'paragraph',
													},
												],
												type: 'listItem',
											},
										],
										type: 'orderedList',
									},
								],
								type: 'listItem',
							},
							{
								content: [
									{
										content: [
											{
												text: 'Update Enhance app',
												type: 'text',
											},
										],
										type: 'paragraph',
									},
									{
										attrs: {
											start: 1,
										},
										content: [
											{
												content: [
													{
														content: [
															{
																text: 'Add link to purchase button',
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
																text: 'Create confirmation route',
																type: 'text',
															},
														],
														type: 'paragraph',
													},
												],
												type: 'listItem',
											},
										],
										type: 'orderedList',
									},
								],
								type: 'listItem',
							},
							{
								content: [
									{
										content: [
											{
												text: 'Back to Stripe',
												type: 'text',
											},
										],
										type: 'paragraph',
									},
									{
										attrs: {
											start: 1,
										},
										content: [
											{
												content: [
													{
														content: [
															{
																text: 'Checkout completed webhook',
																type: 'text',
															},
														],
														type: 'paragraph',
													},
												],
												type: 'listItem',
											},
										],
										type: 'orderedList',
									},
								],
								type: 'listItem',
							},
							{
								content: [
									{
										content: [
											{
												text: 'Augment Enhance app',
												type: 'text',
											},
										],
										type: 'paragraph',
									},
									{
										attrs: {
											start: 1,
										},
										content: [
											{
												content: [
													{
														content: [
															{
																text: 'Add API for webhook',
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
																text: 'Send an email or similar',
																type: 'text',
															},
														],
														type: 'paragraph',
													},
												],
												type: 'listItem',
											},
										],
										type: 'orderedList',
									},
								],
								type: 'listItem',
							},
						],
						type: 'orderedList',
					},
					{
						content: [],
						type: 'paragraph',
					},
				],
				type: 'doc',
			},
			contentGroupId: '648f3bae2af481ed2909d69a',
			coverUrl:
				'https://assets.vrite.io/648a405da2da16eedd81ef95/pIZeRTKty3u9KSv3ln52g.jpeg',
			coverWidth: '100%',
			description: 'work in progress',
			id: '648e7f6e9106221f3079843f',
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
			slug: 'enhance-with-stripe-checkout',
			tags: [],
			title: 'Enhance with Stripe Checkout',
			updatedAt: '2023-06-18T18:23:11.576Z',
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
