---
title: Hello, World
published: 2022-12-24 23:10 -0700
edited: 2022-12-25 00:50 -0700
summary: Back at it. My first entry on tbeseda.com. I can't remember all the places I've published content, but I'm motivated to centralize it. It may not always look like this, but it will always be here.
links:
  - IndieWeb.social: https://indieweb.social/@tbeseda
  - Begin: https://begin.com
  - Enhance: https://enhance.dev
  - Architect: https://arc.codes
---

## Blogging again

My first entry on tbeseda.com. I can't remember all the places I've published content, but I'm motivated to centralize it. It may not always look like this, but it will always be here.

The impetus being: the tire fire that is Twitter, a move to federated social networks, and a recent call to action: [Bring Back Blogging](https://bringback.blog/).

### Varying topics and content

I'm a fan of many things and a fanatic about being a fan of things.

For work, I write a lot about software and the web. Docs and articles about the tools we build, standards, accessibility, new protocols, etc.

I do think I will write about those topics here as they're of great interest to me. But I hope to also publish about other interests:

- Hobbies: leatherwork, classic pickups, game design
- Media, film, and journalism
- Local (to me) issues and politics

## Platform

I'm deploying this handmade website to a series of AWS Lambdas (swapping to Begin soon as we roll out the new platform over there).

I've built several dynamic web apps backed by Markdown content. So I've been able to re-use a lot of that knowledge. Luckily, much of that experience is encapsulated in [Arcdown](https://github.com/architect/arcdown) and can be easily combined with [Enhance](https://enhance.dev) to create a serverless web-publishing application.

I'm keeping an eye toward web standards and accessibility. Serving fast HTML documents with progressive enhancement where desired.

### Features

I've already mixed in IndieWeb elements, like [microformats](https://indieweb.org/microformats). This post is a [h-entry](https://indieweb.org/h-entry) and I have implemented an [h-card](https://indieweb.org/h-card) on my homepage and at [/h-card](/h-card).

This screenshot is from a useful browser extension called [Microformats Reader](https://chrome.google.com/webstore/detail/microformats-reader/phphllmalbniljekjimmalackdppmoif) that will inspect the current tab's standard microformat data. Here's the current article's details:

![a screenshot of parsed mciroformat data on this page](/_public/img/articles/microformats.png)

[_hmm, static assets seem to be broken in production_]

Oh, and the favicon is a random emoji on each request. 🎲

#### Code blocks

I'm likely to use this site to publish code snippets and examples.

_Arcdown_ ships with highlight.js to provide syntax highlighting for code blocks. An example:

```javascript
// render some .md to HTML with Arcdown
const arcdown = new Arcdown({
  pluginOverrides: {
    markdownItToc: {
      containerClass: 'toc mb2 ml-2',
      listType: 'ul',
    },
  },
  plugins: [],
  hljs: {
    sublanguages: { javascript: ['xml', 'css'] },
    plugins: [new HljsLineWrapper({ className: 'line' })],
  },
})

const articleMd = readFileSync('./hello-world.md', 'utf-8')
const article = await arcdown.render(articleMd)
```

### Todo: RSS, more IndieWeb, ActivityPub

RSS has to be done. Like yesterday.

More ideas:

- Photo viewer Web Component
- [webmention](https://indieweb.org/webmention) implementation
- A link blog. I read a ton.
- [ActivityPub](https://indieweb.org/ActivityPub) inbox/outbox
- a "blogroll" (remember those?!)
- [IndieAuth](https://indieweb.org/IndieAuth)
- transfering some old, existing content
- article ⭐️s via Mastodon
- [Gemini](https://gemini.circumlunar.space/) could be cool

Additionally, I'd like to have a place for hand-built web experiments (code, visualizations, games, long-form crafting guides, automotive build logs; things that don't fit well into a `.md` file) -- probably under /knowledge.

It's Christmas and Santa is likely to be here soon. So I'll leave it at that for now.
