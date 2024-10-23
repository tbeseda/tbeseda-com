module.exports = [
  {
    date: '2023-10-27',
    articleID: '41F0-2B30',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Today I (re)learned about the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'Server-Timing',
            },
            {
              type: 'text',
              text: ' HTTP response header. (Thanks for mentioning it, ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://mstdn.social/@scottjehl',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'Scott',
            },
            {
              type: 'text',
              text: '!) Web servers can include this header with arbitrary server timing metrics. So, you could time a common query or the process of rendering HTML and provide that metadata to the browser via a response header.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "This gets really helpful when you open your development console and check the Timing view. Not only do you get the common DNS, TCP, waiting, etc metrics, but your server's custom timings will be shown with their descriptions!",
            },
          ],
        },
        {
          type: 'image',
          attrs: {
            alt: null,
            title: null,
            src: '/_public/.uploaded-images/AB26-CF53_blog-header-timers.png',
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'So I made a ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'small',
            },
            {
              type: 'text',
              text: ' (<80 very sparse lines of code) thing to help create ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'Server-Timing',
            },
            {
              type: 'text',
              text: ' headers:',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'header-timers',
            },
            {
              type: 'text',
              text: ' is available on ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://www.npmjs.com/package/header-timers',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'npm',
            },
            {
              type: 'text',
              text: ' and minimal documentation is available on ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://github.com/tbeseda/header-timers',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'the README',
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
              text: "Here's how it's used on my blog index, an ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://enhance.dev/docs/routing/api-routes/',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'Enhance API handler',
            },
            {
              type: 'text',
              text: ':',
            },
          ],
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: "import arc from '@architect/functions'\nimport HeaderTimers from 'header-timers'\n\nconst { articles } = await arc.tables()\n\nasync function getHandler () {\n  const timers = HeaderTimers()\n\n  timers.start('dynamo', 'get articles')\n  // TODO: not scan\n  const query = await articles.scan({\n    Limit: 100,\n    FilterExpression: 'attribute_exists(published)',\n    ProjectionExpression: 'title, published, slug, description, #date',\n    ExpressionAttributeNames: {\n      '#date': 'date'\n    }\n  })\n  timers.stop('dynamo')\n\n  timers.start('sort', 'articles sort')\n  const sortedArticles = query.Items.filter(({ published }) => published).sort(\n    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()\n  )\n  timers.stop('sort')\n\n  return {\n    headers: {\n      [timers.headerKey]: timers.headerValue()\n    },\n    json: { articles: sortedArticles }\n  }\n}\n\nexport const get = getHandler",
            },
          ],
          attrs: {
            language: 'js',
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "From what I could find, existing packages have affordances for the browser (why, though?), Express, or other HTTP frameworks. Some do allow you to create timers and header values without a framework, but I don't need the overhead. Also many hadn't been updated in a while and were also using the legacy ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'process.hrtime',
            },
            {
              type: 'text',
              text: '. ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'header-timers',
            },
            {
              type: 'text',
              text: ' uses ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://nodejs.org/api/process.html#processhrtimebigint',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'the newer ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'process.hrtime.bigint',
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
              text: 'I wanted something slim I could use in "',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://fwa.dev',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'cloud functions',
            },
            {
              type: 'text',
              text: '" like ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://enhance.dev',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'Enhance',
            },
            {
              type: 'text',
              text: ' API routes.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Check it out and ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://indieweb.social/@tbeseda',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'let me know',
            },
            {
              type: 'text',
              text: ' what you think!',
            },
          ],
        },
      ],
    },
    updatedAt: '2023-10-28T02:23:59.370Z',
    slug: 'super-helpful-server-timing-http-response-headers',
    description:
      'TIL about the Server-Timing header and the accompanying browser dev tools feature. So I built a quick helper to create and transmit performance timers.',
    title: 'Super Helpful: Server-Timing HTTP Response Headers',
  },
  {
    date: '2023-01-08',
    articleID: '6947-949A',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: 'gitclean() {\n  git clean -Xdn\n  if read -q REPLY\\?"Clean these? (Y/y)"; then\n    git clean -Xdf\n  else\n    echo "Still dirty."\n  fi\n}',
            },
          ],
          attrs: {
            language: 'bash',
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'For more fancy, use "',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://github.com/charmbracelet/gum',
                    target: '_blank',
                  },
                },
              ],
              text: 'gum',
            },
            {
              type: 'text',
              text: '":',
            },
          ],
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: 'gitclean() {\n  DIRTY=$(git clean -Xdn | sed \'s/Would remove //g\')\n  gum style \\\n    --foreground 196 --border thick --border-foreground 88 \\\n    --margin "1 2" --padding "1 3" "$DIRTY"\n  gum confirm "🧹 Delete these?" \\\n    && git clean -Xdf \\\n    || echo "Still dirty."\n}',
            },
          ],
          attrs: {
            language: 'bash',
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://gist.github.com/tbeseda/808bb92754161e8032b6cf59fdbc5919',
                    target: '_blank',
                  },
                },
              ],
              text: 'gist version with preview image',
            },
          ],
        },
        {
          type: 'paragraph',
        },
      ],
    },
    updatedAt: '2023-07-05T03:07:57.521Z',
    slug: 'gitclean-zsh-command',
    description: 'A command to run git clean with a confirmation step',
    title: 'gitclean zsh command',
  },
  {
    date: '2023-09-25',
    articleID: '5EAB-A56D',
    published: false,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'http://tbeseda.com',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'tbeseda.com',
            },
            {
              type: 'text',
              text: "'s Blog feature is not built on a traditional CMS like ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'http://WordPress.org',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'WordPress.org',
            },
            {
              type: 'text',
              text: ' or a static site generator like ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'http://11ty.dev',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: '11ty.dev',
            },
            {
              type: 'text',
              text: ' (both are great, btw!). Instead, it\'s built with super performant elements as close to this site\'s "native" stack as possible:',
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
                      text: 'DynamoDB storage for articles',
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
                      text: 'S3 for static article content like images',
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
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'http://Enhance.dev',
                            class: null,
                            target: '_blank',
                          },
                        },
                      ],
                      text: 'Enhance.dev',
                    },
                    {
                      type: 'text',
                      text: ' for rendering and serving HTML + JS via Lambda',
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
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            rel: 'noopener noreferrer nofollow',
                            href: 'http://TipTap.dev',
                            class: null,
                            target: '_blank',
                          },
                        },
                      ],
                      text: 'TipTap.dev',
                    },
                    {
                      type: 'text',
                      text: ' editor (wrapped in a web component and bundled by Enhance)',
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
                      text: 'CloudFront for global caching',
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
              text: 'The Editor',
            },
          ],
          attrs: {
            level: 2,
          },
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Document Structure: ProseMirror',
            },
          ],
          attrs: {
            level: 3,
          },
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'pm2html',
            },
          ],
          attrs: {
            level: 3,
          },
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Enhance',
            },
          ],
          attrs: {
            level: 2,
          },
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Web Components',
            },
          ],
          attrs: {
            level: 3,
          },
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Editor Bundling',
            },
          ],
          attrs: {
            level: 3,
          },
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'APIs for image upload, RSS, etc',
            },
          ],
          attrs: {
            level: 3,
          },
        },
      ],
    },
    updatedAt: '2023-09-26T01:56:43.718Z',
    slug: 'new-blog-architecture',
    description:
      'How I built my blog platform from scratch with Enhance, Architect, and built-in AWS services like DynamoDB, S3, and Lambda.',
    title: 'New Blog Architecture',
  },
  {
    date: '2022-06-29',
    articleID: 'DDA6-227A',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Origins',
            },
          ],
          attrs: {
            level: 2,
          },
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'The old days',
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
              text: 'The original web was a revelation. It may be lo-fi compared to what we know today, but it was a dream for academics, scientists, and indie hobbyists. The Internet connected computers and people around the world. ',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'www',
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
              text: 'It took a long time for technologists to decide the best way to connect people-with-computers to computers-with-content. But content was everywhere and innovation thrived.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Browsers were born, walled off, and  burned down. Vendors thrashed. All while adoption of the web accelerated. People shared.',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Middle ages',
            },
          ],
          attrs: {
            level: 2,
          },
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Business-pants',
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
              text: 'As the business of the web took hold, companies and developers pushed the web to its limits. Constantly running into browser and device limitations. We had to build sites with ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '<table>',
            },
            {
              type: 'text',
              text: 's and spacer .gifs.',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Frameworks and build tools all the way down',
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
              text: 'Libraries helped normalize programming for the web. Then the frameworks had frameworks. And configuration of configuration.  Soon frameworks rewrote browser mechanics inside the browser instead of dealing with browser compatibility and shortcomings. ',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Spinners; spinners everywhere',
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
              text: 'Add a whole new crop of mobile devices and their browsers, the best we could do was paper over browsers and send whole apps to the client. Complete with the fanciest loading screens. Single page apps were cranked out with iterative tools stitched together with .config files and transpiling bundlers.',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Components',
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
              text: 'Component-style development takes off. The only relief from the chaos is authoring web applications with composable elements; small, understandable containers for the madness. As long as the config files were set up correctly…',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'A New Framework',
            },
          ],
          attrs: {
            level: 2,
          },
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Browsers caught up',
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
              text: 'While we were waiting on our test suites, browser vendors worked together and got their act together. Performance gains, standardized APIs, increased user security and privacy, and native components. The sun rises on the platform. 🌅',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Bliss',
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
              text: 'Back to basics. Real ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '<form>',
            },
            {
              type: 'text',
              text: ' tags. Sane CSS layouts in .css files. Native custom elements. No breaking changes or chasing version numbers.',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'A new framework',
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
              text: 'What’s left to solve? Well, getting your code from a server to users’ browsers and a way to organize all those features of the next unicorn. A progressively-enhanced, web-native, HTML-first framework that will work as long as the web does: <framework-website.url>',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'https://gist.github.com/tbeseda/faa558264f8bd42f644912bffc78477e',
            },
          ],
        },
        {
          type: 'paragraph',
        },
      ],
    },
    updatedAt: '2023-07-05T00:21:04.048Z',
    slug: 'a-story-about-the-evolution-of-a-new-web-framework',
    description: 'The original web was a revelation...',
    title: 'A Story About the Evolution of a New Web Framework',
  },
  {
    date: '2023-10-29',
    articleID: '52C0-2C98',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Here are a few functions for adding color to CLI output while respecting the NO_COLOR env variable and a ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '--no-color',
            },
            {
              type: 'text',
              text: ' arg:',
            },
          ],
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: "const s = (s) => s\nconst { red, blue, green, grey } =\n  process.env.NO_COLOR || process.argv.includes('--no-color')\n    ? { red: s, blue: s, green: s, grey: s }\n    : {\n        red: s => `\\u001b[31m${s}\\u001b[39m`,\n        blue: s => `\\u001b[34m${s}\\u001b[39m`,\n        green: s => `\\u001b[32m${s}\\u001b[39m`,\n        grey: s => `\\u001b[90m${s}\\u001b[39m`,\n      }",
            },
          ],
          attrs: {
            language: 'js',
          },
        },
      ],
    },
    updatedAt: '2023-10-29T18:59:21.723Z',
    slug: 'quick-color-functions-for-a-node-js-cli',
    description:
      'Here are a few functions for adding color to CLI output while respecting the NO_COLOR env variable.',
    title: 'Quick Color Functions for a Node.js CLI',
  },
  {
    date: '2023-07-28',
    articleID: 'AFD8-659C',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://htmx.org/',
                    target: '_blank',
                  },
                },
              ],
              text: 'htmx',
            },
            {
              type: 'text',
              text: ' complements ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://enhance.dev/',
                    target: '_blank',
                  },
                },
              ],
              text: 'Enhance',
            },
            {
              type: 'text',
              text: ' projects and vanilla web components very well.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'You can include htmx in your Enhance frontend with 2 lines of code.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'First, (assuming you have an existing Enhance project) install htmx:',
            },
          ],
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: 'npm install htmx.org',
            },
          ],
          attrs: {
            language: null,
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'I like being able to source external libraries from npm so I can specify a version and have it available locally to my project.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Tell Enhance to "',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://enhance.dev/docs/learn/starter-project/public#combining-with-%40bundles',
                    target: '_blank',
                  },
                },
              ],
              text: 'bundle',
            },
            {
              type: 'text',
              text: '" htmx from node_modules as "my-htmx" (pick whatever name you\'d like) in your ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '.arc',
            },
            {
              type: 'text',
              text: ' file:',
            },
          ],
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: "@bundles\nmy-htmx './node_modules/htmx.org/dist/htmx.js'",
            },
          ],
          attrs: {
            language: 'text',
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Now htmx will be available as a Javascript ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'module',
            },
            {
              type: 'text',
              text: ' to the browser, so we can add a script tage to our ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'head.mjs',
            },
            {
              type: 'text',
              text: ' with this src: ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'src="/_public/bundles/my-htmx.mjs"',
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
              text: 'htmx will now be available on each page and to all custom elements!',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This example link will send a POST to ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '/click',
            },
            {
              type: 'text',
              text: ' (which we can define in ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'app/api/click.mjs',
            },
            {
              type: 'text',
              text: ") and replace it's own contents with the response.",
            },
          ],
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: '<a hx-post="/click">Click me!</a>',
            },
          ],
          attrs: {
            language: 'html',
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "I've got the source for a full demo with htmx set up, a custom element, and an API route ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://github.com/tbeseda/enhance-htmx',
                    target: '_blank',
                  },
                },
              ],
              text: 'available on GitHub',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
      ],
    },
    updatedAt: '2023-08-14T17:17:57.783Z',
    slug: 'add-htmx-to-an-enhance-project',
    description:
      "Use Enhance @bundles to include htmx and make it available to all of your app's web components.",
    title: 'Add htmx to an Enhance Project',
  },
  {
    date: '2023-07-12',
    articleID: '97E8-49FF',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Cloud compute is cheap and efficient now. Certainly better than doing it on your customer’s devices. For a very brief time in web dev history it made sense to offload the work to the user. Probably the biggest motivator for SPAs. But we should go back. Less browser JS pixel pushing and more hard work on the server. The only thing I’d change is long running server processes.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'I appreciate the idea of starting from ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '<div id=app />',
            },
            {
              type: 'text',
              text: ' and building the app from there. Holding, changing, relaying state while updating the UI with interactions.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "Take that clean-slate mental model up a level to the HTTP request. You've got the essentials: a path, a body/params, and a cookie.",
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Handle it in a cloud function: get the session, build/mutate state, and respond with semantic HTML (or JSON).',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Make some HTML with ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '<form>',
            },
            {
              type: 'text',
              text: 's, go to town with some CSS, and enhance with JS.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Wait for another request.',
            },
          ],
        },
      ],
    },
    updatedAt: '2023-07-12T17:41:23.630Z',
    slug: 'thoughts-on-ssr-do-it',
    description: 'Less browser JS pixel pushing and more hard work on the server.',
    title: 'Thoughts on SSR: Do It',
  },
  {
    date: '2023-09-27',
    articleID: '83E4-32F3',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'tldr: ',
            },
            {
              type: 'text',
              text: "Occasionally I'll find a package that I want to use that ships an egregious amount of code to npm (and therefor my CI and my deploy runtime). So I built a tool that will stick the contents of a URL in ./vendor so I can use just that. Check out ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'vendurl',
            },
            {
              type: 'text',
              text: ': ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://github.com/tbeseda/vendurl',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'https://github.com/tbeseda/vendurl',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Background: the JS Temporal Polyfill',
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
              text: 'The JS Temporal API is going to be a game changer (Taro has an excellent post with embedded playgrounds here: ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://taro.codes/posts/2023-08-23-temporal-api/',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'https://taro.codes/posts/2023-08-23-temporal-api/',
            },
            {
              type: 'text',
              text: "). It's not ready yet. Far from. But there's a polyfill I'd like to try in a Node.js API or two: ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://github.com/js-temporal/temporal-polyfill',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'https://github.com/js-temporal/temporal-polyfill',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'But the package unpacks to 3.67 MB 😳 (I acknowledge it has several artifacts that are likely meant to be bundled but no thanks).',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "Luckily it's available on several JS CDNs. Notably ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'http://esm.sh',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'esm.sh',
            },
            {
              type: 'text',
              text: " has a bundled version that includes the polyfill's dependencies",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'superscript',
                },
              ],
              text: '1',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'The tool: ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'vendurl',
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
              text: 'First of all, pretty good name, if I do say so myself.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "It's currently ~75 lines of code that checks your ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'package.json',
            },
            {
              type: 'text',
              text: ' for a ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '"vendurl"',
            },
            {
              type: 'text',
              text: ' field and starts downloading text contents to the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: './vendor/',
            },
            {
              type: 'text',
              text: ' directory.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'It gets a little fancy when you (dear Node.js developer) use a package specifier instead of a URL. ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'vendurl',
            },
            {
              type: 'text',
              text: ' will try ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'http://esm.sh',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'esm.sh',
            },
            {
              type: 'text',
              text: ' and take advantage of the built in redirects',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'superscript',
                },
              ],
              text: '1',
            },
            {
              type: 'text',
              text: ' and response headers to find the source code at the end of the rainbow.',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Sample Usage',
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
              text: 'This addition to your ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'package.json',
            },
            {
              type: 'text',
              text: ' will add 3 files to your local vendor (configurable) folder:',
            },
          ],
        },
        {
          type: 'orderedList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'the latest version of the temporal polyfill (200Kb instead of 3,670Kb 😏)',
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
                      text: 'an older version of ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: 'chalk ',
                    },
                    {
                      type: 'text',
                      text: "(doesn't really need vending, use npm for chalk plz)",
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
                      text: 'the invaluable ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: 'leftpad',
                    },
                    {
                      type: 'text',
                      text: ' (note that this is a .cjs file and uses a full unpkg URL)',
                    },
                  ],
                },
              ],
            },
          ],
          attrs: {
            start: 1,
          },
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: '{\n  "vendurl": {\n    "packages": {\n      "temporal.js": "@js-temporal/polyfill",\n      "chalk4.mjs": "chalk@4",\n      "leftpad.cjs": "https://unpkg.com/leftpad@0.0.1/index.js"\n    }\n  }\n}',
            },
          ],
          attrs: {
            language: 'json',
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'The README has more info: ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://github.com/tbeseda/vendurl',
                    class: null,
                    target: '_blank',
                  },
                },
                {
                  type: 'bold',
                },
              ],
              text: 'https://github.com/tbeseda/vendurl',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: "Editor's note: ",
            },
            {
              type: 'text',
              text: 'please ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'highlight',
                },
              ],
              text: 'do not try to replace npm with this',
            },
            {
              type: 'text',
              text: ". It's very much for one-off things.",
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'superscript',
                },
              ],
              text: '1',
            },
            {
              type: 'text',
              text: ' Using ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '?bundle',
            },
            {
              type: 'text',
              text: ' query param is helpful here. Follow the redirects to the eventual source ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://esm.sh/@js-temporal/polyfill?bundle',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'https://esm.sh/@js-temporal/polyfill?bundle',
            },
            {
              type: 'text',
              text: ' becomes ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://esm.sh/v132/@js-temporal/polyfill@0.4.4/es2021/polyfill.bundle.mjs',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'https://esm.sh/v132/@js-temporal/polyfill@0.4.4/es2021/polyfill.bundle.mjs',
            },
            {
              type: 'text',
              text: ' 🤌',
            },
          ],
        },
      ],
    },
    updatedAt: '2023-09-27T16:18:26.742Z',
    slug: 'vendurl-vendor-packages-from-a-url-to-your-node-js-project',
    description:
      "Some libraries are not available on npm or not published in a way you'd like to consume. Vendor them to your project from a URL with vendurl.",
    title: 'vendurl: Vendor Packages from a URL to Your Node.js Project',
  },
  {
    date: '2024-01-23',
    articleID: 'BA97-4252',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Measuring the ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'real',
            },
            {
              type: 'text',
              text: ' install size of a module from npm is kind of an art because different package managers and different versions of those package managers resolve the dependency graph differently. Some account for shared dependencies and peer dependencies. Others measure a "bundled" size and compression because they focus on front end code. Also, tools differ in how they math KB/MB, kib, etc. ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'But',
            },
            {
              type: 'text',
              text: ' if you are mostly comparing alternatives and use the same tool to compare, you generally get a good, relative baseline.',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "So, my goal isn't necessarily to see how various modules combine on disk, but which package from a set I want to use for a specific purpose.",
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://www.npmjs.com/package/howfat',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'Enter ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'howfat.',
            },
            {
              type: 'text',
              text: ' You can use it anywhere npm is installed with ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'npx',
            },
            {
              type: 'text',
              text: ':',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: '> npx howfat enquirer\nenquirer@2.4.1 (3 deps, 219.2kb, 63 files, ©MIT)\n├── ansi-colors@4.1.3 (25.53kb, 6 files, ©MIT)\n╰─┬ strip-ansi@6.0.1 (1 dep, 9.41kb, 10 files, ©MIT)\n  ╰── ansi-regex@5.0.1 (5.48kb, 5 files, ©MIT)',
            },
          ],
          attrs: {
            language: null,
          },
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'You can format results with a "reporter" (some graphs create HUGE trees):',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: '> npx howfat -r simple @inquirer/prompts\nDependencies: 112\nSize: 6.26mb\nFiles: 1076',
            },
          ],
          attrs: {
            language: null,
          },
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'You can provide multiple package names:',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: '> npx howfat -r table minimist chalk prompts',
            },
          ],
          attrs: {
            language: null,
          },
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'And even measure the current project directory:',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: '> npx howfat .',
            },
          ],
          attrs: {
            language: null,
          },
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "Again, this isn't necessarily for getting a specific, real size on disk, but it is a great way to compare and get a general idea of weights while considering various modules.",
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Also, ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'inquirer.js',
            },
            {
              type: 'text',
              text: ' is huge on disk, y tho?',
            },
          ],
        },
      ],
    },
    updatedAt: '2024-01-23T17:53:48.200Z',
    slug: 'compare-node-js-module-sizes-with-a-cli',
    description:
      'While there are many ways to analyze `./node_modules`, I use a CLI utility from npm called `howfat` to compare package install sizes. This is very helpful to keep total project size down and my dependency graph simpler.',
    title: 'Compare Node.js Module Sizes With a CLI',
  },
  {
    date: '2022-12-01',
    articleID: '5542-3C74',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'A simple script to run ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://hurl.dev/',
                    target: '_blank',
                  },
                },
              ],
              text: 'Hurl',
            },
            {
              type: 'text',
              text: ' tests against a Node.js server',
            },
          ],
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: '#!/bin/bash\nset -eu # throw if things go bad\n\necho "Booting server"\nnpm run start &\nserverPid=$!\n\nsleep 2 # a smarter script would ping server\n\necho -e "\\nRunning Hurl tests\\n"\nnpx hurl --test test/integration/*.hurl\n\necho -e "Stopping server <${serverPid}>"\nkill $serverPid',
            },
          ],
          attrs: {
            language: null,
          },
        },
      ],
    },
    updatedAt: '2023-07-05T04:56:13.852Z',
    slug: 'run-hurl-tests-against-a-node-js-server',
    description: 'A simple script to run Hurl tests against a Node.js server',
    title: 'Run Hurl tests against a Node.js server',
  },
  {
    date: '2023-10-05',
    articleID: '9D3F-1D16',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "Prompt the user if they'd like to continue when executing a Node.js script from the command line.",
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'The tldr:',
            },
          ],
          attrs: {
            level: 2,
          },
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: "import { createInterface } from 'node:readline/promises'\nimport { exit, stdin, stdout } from 'node:process'\n\nconst rl = createInterface({ input: stdin, output: stdout })\nconst answer = await rl.question('You sure? (y/n) ')\nrl.close()\nif (answer.toLowerCase() !== 'y') exit(0)",
            },
          ],
          attrs: {
            language: 'js',
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "That's it actually.",
            },
          ],
        },
      ],
    },
    updatedAt: '2023-10-05T15:49:59.448Z',
    slug: 'easy-confirmation-prompt-for-node-js-cli-script',
    description:
      "Prompt the user if they'd like to continue when executing a Node.js script from the command line.",
    title: 'Easy Confirmation Prompt for Node.js CLI Script',
  },
  {
    date: '2023-07-13',
    articleID: '203A-90D5',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "I added image uploading to my custom blog editor, so here's some AI bison I made with Midjourney.",
            },
          ],
        },
        {
          type: 'image',
          attrs: {
            alt: null,
            title: null,
            src: '/_public/.uploaded-images/44BD-12E2_bison-cover.png',
          },
        },
      ],
    },
    updatedAt: '2023-09-26T00:28:53.626Z',
    slug: 'bison',
    description:
      "I added image uploading to my custom blog editor, so here's some AI bison I made with Midjourney.",
    title: 'An Image of Some Bison',
  },
  {
    date: '2023-10-05',
    articleID: '4672-8D60',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'How to check if a Node.js (ESM) program is being executed on the command line or when imported by a Node.js process.',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Use ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'argv',
            },
            {
              type: 'text',
              text: " to find Node's entry",
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
              text: 'and compare it to the current filename. If this is ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'script.js',
            },
            {
              type: 'text',
              text: ':',
            },
          ],
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: "import { argv } from 'node:process'\nimport { fileURLToPath } from 'node:url'\n\nconst FILE = fileURLToPath(import.meta.url)\nconst isCLI = FILE === argv[1]",
            },
          ],
          attrs: {
            language: 'js',
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'And this is ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'main.js',
            },
            {
              type: 'text',
              text: ':',
            },
          ],
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: "import script from './script.js'",
            },
          ],
          attrs: {
            language: 'js',
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'In my testing, the following is consistent:',
            },
          ],
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: 'node script.js # isCLI => true\nnode main.js   # isCLI => false',
            },
          ],
          attrs: {
            language: 'sh',
          },
        },
      ],
    },
    updatedAt: '2023-10-28T02:27:14.493Z',
    slug: 'check-if-node-js-file-is-imported-or-run-as-cli',
    description:
      'How to check if a Node.js (ESM) program is being executed on the command line or when imported by a Node.js process.',
    title: 'Check If Node.js File is Imported or Run as CLI',
  },
  {
    date: '2022-12-24',
    articleID: '76C3-19A2',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'edit (2023-07): ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'The technical parts here are outdated, but the rest remains relevant.',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Blogging again',
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
              text: 'My first entry on ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'http://tbeseda.com',
                    target: '_blank',
                  },
                },
              ],
              text: 'tbeseda.com',
            },
            {
              type: 'text',
              text: ". I can't remember all the places I've published content, but I'm motivated to centralize it. It may not always look like this, but it will always be here.",
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'The impetus being: the tire fire that is Twitter, a move to federated social networks, and a recent call to action: ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://bringback.blog/',
                    target: '_blank',
                  },
                },
              ],
              text: 'Bring Back Blogging',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Varying topics and content',
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
              text: "I'm a fan of many things and a fanatic about being a fan of things.",
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'For work, I write a lot about software and the web. Docs and articles about the tools we build, standards, accessibility, new protocols, etc.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "I do think I will write about those topics here as they're of great interest to me. But I hope to also publish about other interests:",
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
                      text: 'Hobbies: leatherwork, classic pickups, game design',
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
                      text: 'Media, film, and journalism',
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
                      text: 'Local (to me) issues and politics',
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
              text: 'Platform',
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
              text: "I'm deploying this handmade website to a series of AWS Lambdas (swapping to Begin soon as we roll out the new platform over there).",
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "I've built several dynamic web apps backed by Markdown content. So I've been able to re-use a lot of that knowledge. Luckily, much of that experience is encapsulated in ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://github.com/architect/arcdown',
                    target: '_blank',
                  },
                },
              ],
              text: 'Arcdown',
            },
            {
              type: 'text',
              text: ' and can be easily combined with ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://enhance.dev/',
                    target: '_blank',
                  },
                },
              ],
              text: 'Enhance',
            },
            {
              type: 'text',
              text: ' to create a serverless web-publishing application.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "I'm keeping an eye toward web standards and accessibility. Serving fast HTML documents with progressive enhancement where desired.",
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Features',
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
              text: "I've already mixed in IndieWeb elements, like ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://indieweb.org/microformats',
                    target: '_blank',
                  },
                },
              ],
              text: 'microformats',
            },
            {
              type: 'text',
              text: '. This post is a ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://indieweb.org/h-entry',
                    target: '_blank',
                  },
                },
              ],
              text: 'h-entry',
            },
            {
              type: 'text',
              text: ' and I have implemented an ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://indieweb.org/h-card',
                    target: '_blank',
                  },
                },
              ],
              text: 'h-card',
            },
            {
              type: 'text',
              text: ' on my homepage and at ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://github.com/tbeseda/tbeseda-com/blob/cc07aa3990ee46fd5a47aba80e138401963cc1e8/h-card',
                    target: '_blank',
                  },
                },
              ],
              text: '/h-card',
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
              text: 'This screenshot is from a useful browser extension called ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://chrome.google.com/webstore/detail/microformats-reader/phphllmalbniljekjimmalackdppmoif',
                    target: '_blank',
                  },
                },
              ],
              text: 'Microformats Reader',
            },
            {
              type: 'text',
              text: " that will inspect the current tab's standard microformat data. ",
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Oh, and the favicon is a random emoji on each request. 🎲',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Code blocks',
            },
          ],
          attrs: {
            level: 4,
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "I'm likely to use this site to publish code snippets and examples.",
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'Arcdown',
            },
            {
              type: 'text',
              text: ' ships with highlight.js to provide syntax highlighting for code blocks. An example:',
            },
          ],
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: "// render some .md to HTML with Arcdown\nconst arcdown = new Arcdown({\n  pluginOverrides: {\n    markdownItToc: {\n      containerClass: 'toc mb2 ml-2',\n      listType: 'ul',\n    },\n  },\n  plugins: [],\n  hljs: {\n    sublanguages: { javascript: ['xml', 'css'] },\n    plugins: [new HljsLineWrapper({ className: 'line' })],\n  },\n})\n\nconst articleMd = readFileSync('./hello-world.md', 'utf-8')\nconst article = await arcdown.render(articleMd)",
            },
          ],
          attrs: {
            language: null,
          },
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Todo: RSS, more IndieWeb, ActivityPub',
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
              text: 'RSS has to be done. Like yesterday.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'More ideas:',
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
                      text: 'Photo viewer Web Component',
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
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            class: null,
                            href: 'https://indieweb.org/webmention',
                            target: '_blank',
                          },
                        },
                      ],
                      text: 'webmention',
                    },
                    {
                      type: 'text',
                      text: ' implementation',
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
                      text: 'A link blog. I read a ton.',
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
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            class: null,
                            href: 'https://indieweb.org/ActivityPub',
                            target: '_blank',
                          },
                        },
                      ],
                      text: 'ActivityPub',
                    },
                    {
                      type: 'text',
                      text: ' inbox/outbox',
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
                      text: 'a "blogroll" (remember those?!)',
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
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            class: null,
                            href: 'https://indieweb.org/IndieAuth',
                            target: '_blank',
                          },
                        },
                      ],
                      text: 'IndieAuth',
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
                      text: 'transfering some old, existing content',
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
                      text: 'article ⭐️s via Mastodon',
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
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            class: null,
                            href: 'https://gemini.circumlunar.space/',
                            target: '_blank',
                          },
                        },
                      ],
                      text: 'Gemini',
                    },
                    {
                      type: 'text',
                      text: ' could be cool',
                    },
                  ],
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
              text: "Additionally, I'd like to have a place for hand-built web experiments (code, visualizations, games, long-form crafting guides, automotive build logs; things that don't fit well into a ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '.md',
            },
            {
              type: 'text',
              text: ' file) -- probably under /knowledge.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "It's Christmas and Santa is likely to be here soon. So I'll leave it at that for now.",
            },
          ],
        },
      ],
    },
    updatedAt: '2023-07-05T05:00:57.535Z',
    slug: '2022-hello-world',
    description:
      "Back at it. My first entry on tbeseda.com. I can't remember all the places I've published content, but I'm motivated to centralize it. It may not always look like this, but it will always be here.",
    title: 'Hello, World',
  },
  {
    date: '2023-09-25',
    articleID: 'B4A7-1C22',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: '🌶️ Warning:',
            },
            {
              type: 'text',
              text: ' opinions abound and hardly edited, you may not agree, but discussion welcome.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "These are super brief descriptions of things I'd teach to an aspiring web developer. More of a punch list than a descriptive outline; where the end-goal is to create a dynamic web application. I've intentionally left out specific products (like ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'where',
            },
            {
              type: 'text',
              text: ' to publish) and generalized tech choices (like back end languages).',
            },
          ],
        },
        {
          type: 'horizontalRule',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'make an HTML page (no CSS)',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'publish it.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'to a static HTML host',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'with a public URL you can send to friend',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'now add a .jpg file and an ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '<img>',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'publish again.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'pick a language to generate HTML - I like Node.js and Ruby, but PHP is low overhead',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'depending on runtime, it is reasonable to add a 3rd party dep for a server (not a framework)',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'use that language to accept data submitted by a HTML ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '<form> ',
            },
            {
              type: 'text',
              text: '- like a todo item or contact',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'log the submitted form data to the console',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'echo that data back as HTML - a round trip confirmation',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'use the correct HTTP status code: 201',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'deploy it.',
            },
            {
              type: 'text',
              text: ' this will require an application host; a server',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'connect to a database from your server - *SQL(ite) is common, low barrier, and free',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'use the database to create and retrieve data - ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'INSERT',
            },
            {
              type: 'text',
              text: ' and ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'SELECT',
            },
            {
              type: 'text',
              text: ' ops:',
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
                      text: 'save the form data to the db (',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'bold',
                        },
                      ],
                      text: 'C',
                    },
                    {
                      type: 'text',
                      text: 'reate) - use a primary key ',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'code',
                        },
                      ],
                      text: 'id',
                    },
                    {
                      type: 'text',
                      text: ' for each data record',
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
                      text: 'list the data from the db in the response (',
                    },
                    {
                      type: 'text',
                      marks: [
                        {
                          type: 'bold',
                        },
                      ],
                      text: 'R',
                    },
                    {
                      type: 'text',
                      text: 'ead) - generate HTML in a loop',
                    },
                  ],
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
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'deploy again.',
            },
            {
              type: 'text',
              text: ' with db connection',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'this is ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
                {
                  type: 'italic',
                },
              ],
              text: 'C',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: ' and ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
                {
                  type: 'italic',
                },
              ],
              text: 'R',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: ' of ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
                {
                  type: 'italic',
                },
              ],
              text: 'CRUD:',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: ' create. read. update. delete.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'add forms to do ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'U',
            },
            {
              type: 'text',
              text: 'pdate and ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'D',
            },
            {
              type: 'text',
              text: "elete - hint: you need the row's ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'id',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'this part isn’t easy and will take time; that’s ok',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'keep deploying.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'add a <style> tag to your HTML',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'just some CSS niceties for layout and type (no classes)',
            },
          ],
        },
        {
          type: 'blockquote',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Now, what might we want browser JS for at this point?',
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
              text: 'serious Q, not rhetorical. in lieu of new browser interactivity features, add:',
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
                      text: 'more CSS - try classes,',
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
                      text: 'mobile layout,',
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
                      text: 'more dynamic data',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'blockquote',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'What else is missing from the client?',
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
              text: 'can it be done with improved HTML + styles - ie. transitions and animation',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'add a search <form> that sends a GET',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'don’t even use ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'LIKE',
            },
            {
              type: 'text',
              text: ' in the db query - ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'Array.filter',
            },
            {
              type: 'text',
              text: ' results',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'finally',
            },
            {
              type: 'text',
              text: ', we can add browser JS to enhance this filter form',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'inline ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '<script>',
            },
            {
              type: 'text',
              text: ' - form submit "event" with ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'preventDefault()',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'simply hide elems where ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'innterText',
            },
            {
              type: 'text',
              text: " doesn't match input value",
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'without JS, it will fall back to our server request',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'always be deploying.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '...',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'okay, now we can try out:',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'another data model with [one|many]-to-many relations,',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'image upload,',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'authentication',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'superscript',
                },
              ],
              text: '1',
            },
            {
              type: 'text',
              text: ',',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'authorization (yes, this is different) + admin,',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'unit tests,',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'version control,',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'automatic deployment,',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'integration tests,',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'performance analysis',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'Only once those are done:',
            },
            {
              type: 'text',
              text: ' ',
            },
          ],
        },
        {
          type: 'blockquote',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Can we do all of CRUD without reloading the page?',
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
              text: 'modify the DOM based on request result',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'and we could persist some data locally when offline',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'after using AJAX, maybe do it with wss',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'fin.',
            },
          ],
        },
        {
          type: 'horizontalRule',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '🔑 The key: deviations from this path are likely and should be explored. Variations can require more of the developer, but not of the user (or their machine, network connection, abilities).',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Ideas: serverless deployment, transpiling syntax to differing runtimes, data indexing, worker queues, compression, regional availability, bundling, etc.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Any added requirement of the developer must increase real business value; not just engineering for engineering’s sake.',
            },
          ],
        },
        {
          type: 'blockquote',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: '“Where’s accessibility?”',
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
              text: 'Glad you asked! It’s a part of the entire exercise. By default, HTML from a server is more readable by people and machines than generating a bunch of markup, yeeting it into the DOM, only to change it again a few ms later. Of course, we can always improve ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'how',
            },
            {
              type: 'text',
              text: ' it’s interpreted and this should be discussed at each stage of learning. If we’re following web standards, the baseline is accessible. That’s part of why it’s a “standard.”',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'superscript',
                },
              ],
              text: '1',
            },
            {
              type: 'text',
              text: ' This is not easy, resist using a provider and learn about sessions (cookies are easy, I promise) and safely storing password hashes.',
            },
          ],
        },
      ],
    },
    updatedAt: '2023-09-26T15:53:06.387Z',
    slug: 'html-first-web-dev-learning-path',
    description: "How I'd teach a newcomer to build for the web.",
    title: 'HTML-First Web Dev Learning Path',
  },
  {
    date: '2023-07-04',
    articleID: '4541-BEED',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "A roundup of posts I've authored for ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://begin.com/blog',
                    target: '_blank',
                  },
                },
              ],
              text: "Begin.com's blog",
            },
            {
              type: 'text',
              text: ':',
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
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            class: null,
                            href: 'https://begin.com/blog/posts/2023-06-06-dbaas-in-lambda',
                            target: '_blank',
                          },
                        },
                      ],
                      text: 'Tested: Database Providers on Lambda',
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
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            class: null,
                            href: 'https://begin.com/blog/posts/2023-04-03-begin-domains',
                            target: '_blank',
                          },
                        },
                      ],
                      text: 'Begin Domains beta',
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
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            class: null,
                            href: 'https://begin.com/blog/posts/2022-12-12-selecting-third-party-web-components',
                            target: '_blank',
                          },
                        },
                      ],
                      text: 'Selecting 3rd Party Web Components',
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
                      marks: [
                        {
                          type: 'link',
                          attrs: {
                            class: null,
                            href: 'https://begin.com/blog/posts/2022-12-01-custom-element-as-api',
                            target: '_blank',
                          },
                        },
                      ],
                      text: 'HTML Custom Element as a Feature API',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    updatedAt: '2023-07-05T03:27:12.544Z',
    slug: '2023-07-my-articles-on-begin',
    description: "A roundup of posts I've authored for Begin.com's blog.",
    title: 'My Articles on Begin',
  },
  {
    date: '2024-02-06',
    articleID: '6110-261D',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://aws.amazon.com/bedrock/',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'AWS Bedrock',
            },
            {
              type: 'text',
              text: " is AWS's managed AI service that lets users access common models like Amazon Titan and those from other orgs like Meta's Llama and Stability AI's StableDiffusion.",
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://aws-lite.org',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'aws-lite',
            },
            {
              type: 'text',
              text: " is a minimal AWS API client. It's particularly lightweight and fast when compared to the official SDKs. (I contribute to ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'aws-lite',
            },
            {
              type: 'text',
              text: ' as a part of my open source work on ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://arc.codes/',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'Architect',
            },
            {
              type: 'text',
              text: ' which is included in my job description at ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://begin.com',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'Begin',
            },
            {
              type: 'text',
              text: '.)',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "Typically a developer would use aws-lite in combination with at least one of the many available plugins. DynamoDB, S3, Lambda, etc are supported by plugins. However, there isn't (yet) a plugin for Bedrock. In the meantime, we can use the bare ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '@aws-lite/client',
            },
            {
              type: 'text',
              text: ' to create authenticated requests to any service API at AWS.',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: 'npm i @aws-lite/client',
            },
          ],
          attrs: {
            language: 'sh',
          },
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Requests will automatically use my AWS credentials found in ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '~/.aws/credentials',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Note: you will need to have access granted to specific Bedrock models on your own AWS account. This is fairly quick, but does require some AWS console spelunking.',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "Let's start with the basics, set up aws-lite and get a list of Meta models from Bedrock:",
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: "import AwsLite from '@aws-lite/client'\nconst PROVIDER = 'meta'\n\nconst aws = await AwsLite({\n  region: 'us-east-1',\n  autoloadPlugins: false,\n  verifyService: false,\n  // debug: true,\n})\n\n// https://docs.aws.amazon.com/bedrock/latest/APIReference/API_ListFoundationModels.html\nconst ListFoundationModels = await aws({\n  service: 'bedrock',\n  path: '/foundation-models',\n  query: { byProvider: PROVIDER },\n})\nconst { modelSummaries: models } = ListFoundationModels.payload\n\nconsole.log(models.length, `\"${PROVIDER}\" models found on Bedrock`)",
            },
          ],
          attrs: {
            language: 'js',
          },
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'As of today, this prints',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'blockquote',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: '8 "meta" models found on Bedrock',
                },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Next, we can invoke one of these models with a known ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'Id',
            },
            {
              type: 'text',
              text: ' using a hardcoded question:',
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: 'const LLAMA_ID = \'meta.llama2-13b-chat-v1\'\nconst myLlama = models.find(({modelId}) => modelId === LLAMA_ID)\n\nconsole.log(`Using "${myLlama.modelName}"`) // Using "Llama 2 Chat 13B"\n\nconst PROMPT = \'What is an axolotl?\'\nconsole.log(`Question: "${PROMPT}"`) // Question: "What is an axolotl?"\n\n// https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html\nconst InvokeModel = await aws({\n  service: \'bedrock\',\n  host: \'bedrock-runtime.us-east-1.amazonaws.com\', \n  // Note: the host differs from the service name, so we provide the full value\n  path: `/model/${myLlama.modelId}/invoke`,\n  // https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-meta.html\n  payload: {\n    prompt: PROMPT,\n    temperature: 0.2,\n    top_p: 0.9,\n    max_gen_len: 512,\n  },\n})\nconst { generation } = InvokeModel.payload\n\nconsole.log(generation.trim()) // the answer describing axolotls!',
            },
          ],
          attrs: {
            language: 'js',
          },
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "That's it!",
            },
          ],
        },
        {
          type: 'paragraph',
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: '> node index.js\n8 "meta" models found on Bedrock\nUsing "Llama 2 Chat 13B"...\n\nQuestion: "What is an axolotl?"\nAn axolotl (Ambystoma mexicanum) is a type of salamander that\nnever undergoes metamorphosis. Instead, it remains in its \nlarval stage throughout its life, which can range from 10 to \n15 years in captivity. Axolotls are native to Mexico and are \nfound in freshwater lakes, canals, and drainage ditches. They \nare known for their unique ability to regrow their limbs, \neyes, and parts of their brains, making them a popular subject \nfor scientific research.\n\n[... lengthy answer redacted]\n\nSpent 414 (prompt: 9 + generation: 405) tokens',
            },
          ],
          attrs: {
            language: 'txt',
          },
        },
        {
          type: 'paragraph',
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'I think next I will set this up as a small CLI to allow me to choose other models and enter a prompt from the command line.',
            },
          ],
        },
      ],
    },
    updatedAt: '2024-02-06T23:30:22.766Z',
    slug: 'aws-bedrock-with-aws-lite',
    description:
      "Connect to AWS Bedrock with the latest release of aws-lite. In less than 50 lines, we'll be able to select a model and send a query.",
    title: 'AWS Bedrock with aws-lite',
  },
  {
    date: '2021-11-21',
    articleID: '4255-A43F',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'My ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://the.exa.website/',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'exa',
            },
            {
              type: 'text',
              text: ' aliases (in ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '~/.zshrc',
            },
            {
              type: 'text',
              text: '):',
            },
          ],
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: 'alias ll="exa --all --header --icons --long"\nalias lt="ll --tree --level=3 --git-ignore --ignore-glob=\'.git|node_modules\'"',
            },
          ],
          attrs: {
            language: 'bash',
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'I spent a lot of time reading ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    rel: 'noopener noreferrer nofollow',
                    href: 'https://the.exa.website/docs/command-line-options',
                    class: null,
                    target: '_blank',
                  },
                },
              ],
              text: 'the command line options doc',
            },
            {
              type: 'text',
              text: ', tweak as needed 😅',
            },
          ],
        },
      ],
    },
    updatedAt: '2023-09-26T00:51:53.029Z',
    slug: 'i-use-exa-instead-of-ls',
    description: 'List directories at the command line with <code>exa</code>.',
    title: 'I use exa instead of ls',
  },
  {
    date: '2023-07-18',
    articleID: 'F149-04BA',
    published: true,
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Play with ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://tbeseda.com/experiments/skull',
                    target: '_blank',
                  },
                },
              ],
              text: 'the actual "experiment" here',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'tldr:',
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
              text: "Don't load huge JSON into memory, pick a random spot in the file, stream in a string about twice the size of the expected record, find a complete JSON object, parse it, and return. Code at the bottom ↓",
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'Background',
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
              text: 'I came across an article on ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://muxup.com/2022q3/muxup-implementation-notes#footer-images',
                    target: '_blank',
                  },
                },
              ],
              text: 'muxup.com',
            },
            {
              type: 'text',
              text: ' about how the doodles were added to their footer. That led me down the path of exploring ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://quickdraw.withgoogle.com/data/skull',
                    target: '_blank',
                  },
                },
              ],
              text: 'the skull illustrations',
            },
            {
              type: 'text',
              text: ' users had created for Google\'s "Quick, Draw!" Then I found myself with ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://github.com/googlecreativelab/quickdraw-dataset',
                    target: '_blank',
                  },
                },
              ],
              text: 'a 76MB .ndjson file',
            },
            {
              type: 'text',
              text: ' in my downloads folder and an idea!',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '(btw, ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: '.ndjson',
            },
            {
              type: 'text',
              text: ' is ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'http://ndjson.org/',
                    target: '_blank',
                  },
                },
              ],
              text: 'newline delimited JSON',
            },
            {
              type: 'text',
              text: ' -- pretty helpful here!)',
            },
          ],
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'The Idea',
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
              text: "Pick a random skull doodle and render it with an HTML custom element. Extend it as a web component so it could fetch new skulls (eventually I'll animate the drawing). ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://tbeseda.com/experiments/skull',
                    target: '_blank',
                  },
                },
              ],
              text: 'The front-end',
            },
            {
              type: 'text',
              text: " was pretty straight forward, here's ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://github.com/tbeseda/tbeseda-com/blob/main/app/elements/experiment/skull.mjs',
                    target: '_blank',
                  },
                },
              ],
              text: 'my Enhance element',
            },
            {
              type: 'text',
              text: '.',
            },
          ],
        },
        {
          type: 'image',
          attrs: {
            alt: null,
            title: null,
            src: '/_public/.uploaded-images/2AA9-0372_randomSkull.png',
          },
        },
        {
          type: 'heading',
          content: [
            {
              type: 'text',
              text: 'The crux: reading a random line from a huge file in AWS Lambda without loading the whole thing into memory such that handler execution takes several seconds and no one wants to wait that long to see a mediocre skull drawing.',
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
              text: "The 76MB file contains 126,174 skull doodles, so I didn't want to load all that into Lambda RAM and pick a random one from a huge array. This would make response time super slow: like a whole second. Nobody has that kind of time.",
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Instead, I stream out 2kb from a random position in the file, look for a whole JSON object in that section, parse it, and return it. All in ~150ms.',
            },
          ],
        },
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: "import fs from 'node:fs'\n\nconst filePath = './skulls.ndjson' // 1 skull per line\nconst stats = fs.statSync(filePath) // get filesize\nconst cursor = Math.floor(Math.random() * stats.size)\nconst fileStream = fs.createReadStream(filePath, {\n  start: cursor, // start is likely mid-line\n  end: cursor + 2000, // line is typically ~1kb, grab 2\n  encoding: 'utf8',\n})\n\n// collect the full length of 2kb\nlet chonks = ''\nfor await (const chonk of fileStream) chonks += chonk\n\n// find the first and second newlines\nconst n1 = chonks.indexOf('\\n')\nconst n2 = chonks.indexOf('\\n', n1 + 1)\nconst line = chonks.slice(n1 + 1, n2)\n\nconst 💀 = JSON.parse(line)",
            },
          ],
          attrs: {
            language: 'js',
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: "Here's ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://github.com/tbeseda/tbeseda-com/blob/main/src/http/get-api-skull/index.mjs',
                    target: '_blank',
                  },
                },
              ],
              text: 'the full handler',
            },
            {
              type: 'text',
              text: " (it's a part of a larger ",
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://arc.codes/',
                    target: '_blank',
                  },
                },
              ],
              text: 'Architect',
            },
            {
              type: 'text',
              text: ' app with ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'link',
                  attrs: {
                    class: null,
                    href: 'https://enhance.dev/',
                    target: '_blank',
                  },
                },
              ],
              text: 'Enhance',
            },
            {
              type: 'text',
              text: ').',
            },
          ],
        },
      ],
    },
    updatedAt: '2023-07-18T18:09:04.046Z',
    slug: 'get-a-random-record-from-json',
    description:
      'How I put a 76MB file in a Lambda and grab a random line without loading the whole thing into memory.',
    title: 'Get a random record from 126K lines of JSON',
  },
]
