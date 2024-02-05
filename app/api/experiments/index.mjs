/** @type {import('@enhance/types').EnhanceApiFn} */
export const get = async function () {
  const experiments = [
    {
      name: 'Passkeys with Node.js and WebAuthn',
      date: '2024-02-04',
      description: 'Simple user registration + login with webauthn and Node.',
      url: '/experiments/passkeys',
      wip: true,
    },
    {
      name: 'Custom Element Sparklines',
      date: '2024-01-24',
      description:
        "Inspired by Chris Burnell's work: A server-rendered custom element for sparkline graphs.",
      url: '/experiments/custom-element-sparklines',
      wip: true,
    },
    {
      name: 'Enhance SSR Playground',
      date: '2024-01-18',
      description:
        'A browser-based playground for testing Enhance SSR.',
      url: '/experiments/enhance-ssr-playground',
      wip: true,
    },
    {
      name: 'Blog Search',
      date: '2023-11-18',
      description:
        'Search my blog for articles containing a word or phrase.',
      url: '/experiments/blog-search',
      featured: true,
      wip: true,
    },
    {
      name: 'Omnivore.app Linkblog',
      date: '2023',
      description:
        'My Omnivore.app Reading List. Features recently saved articles, highlights, and all-time favorites.',
      url: '/experiments/omnivore',
      featured: true,
    },
    {
      name: 'AWS Lambda Runtimes',
      date: '2023',
      description:
        'A view that fetches a "hello world" from 4 different Lambda runtimes: Ruby, Python, Go, and Rust.',
      url: '/experiments/runtimes',
    },
    {
      name: 'Pug Template',
      date: '2023',
      description: 'Render a Pug template in real-time with Enhance.',
      url: '/experiments/pug-template',
    },
    {
      name: 'Random Skull from "Quick, Draw!"',
      date: '2023',
      description: 'Use canvas to draw a skull from the Quick, Draw! dataset.',
      url: '/experiments/skull',
      featured: true,
    },
    {
      name: 'My Spotify Activity',
      date: '2023',
      description:
        'Live updates from my listening on Spotify! Also my top tracks and artists.',
      url: '/experiments/spotify',
      featured: true,
    },
    {
      name: 'Article Publishing Demo',
      date: '2023',
      description:
        'A proof-of-concept for publishing articles to my site. This ended up being the basis for my custom CMS.',
      url: '/experiments/fake-articles',
    },
    {
      name: '$ terminal',
      date: '2023',
      description:
        'A terminal emulator that runs in the browser. Based on xterm.js.',
      url: '/experiments/$',
    },
    {
      name: 'Article Publishing with Vrite.io',
      date: '2023',
      description:
        'I used Vrite.io to author content and automatically ingest and cache it here. (Dependent on Vrite.io API.)',
      url: '/experiments/vrite',
    },
    {
      name: 'My Local Weather and Air Quality',
      date: '2023',
      description:
        'Recent data from Tomorrow.io, AirNow.gov, and IQAir.com.',
      url: '/experiments/my-weather',
    },
    {
      name: 'h-card Custom Element',
      date: '2023',
      description: 'h-card Custom Element',
      url: '/h-card',
    },
  ]

  // sort by featured and then date
  const sortedExperiments = experiments.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1
    return 0
  })

  return {
    json: {
      icon: '👨🏻‍🔬', // overrides preflight
      experiments: sortedExperiments,
    },
  }
}
