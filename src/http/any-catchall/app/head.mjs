/** @type {import('@enhance/types').EnhanceHeadFn} */
export default function Head({ req, store }) {
  const { path } = req
  const { title, myWeather, article } = store
  const hljsThemeCss = 'https://unpkg.com/@highlightjs/cdn-assets@11.7.0/styles/night-owl.min.css'

  const snowing = myWeather?.values.snowIntensity

  let ogTags = ''
  if (article) {
    ogTags = /* html */ `
      <meta property="og:title" content="${article.title}" />
      <meta property="og:description" content="${article.description}" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://tbeseda.com${path}" />
      <meta property="og:image" content="https://tbeseda.com/og-img/${article.slug}" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="tbeseda.com" />
      <meta property="og:locale" content="en_US" />
      <meta property="article:author" content="Taylor Beseda" />
      <meta property="article:published_time" content="${article.date}" />

      <meta name="twitter:card" content="summary_large_image">
      <meta property="twitter:domain" content="tbeseda.com">
      <meta property="twitter:url" content="https://tbeseda.com${path}">
      <meta name="twitter:title" content="${article.title}">
      <meta name="twitter:description" content="${article.description}">
      <meta name="twitter:image" content="https://tbeseda.com/og-img/${article.slug}">
    `.trim()
  }

  return /* html */ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="google-site-verification" content="5yKJt5rGoKcFXspMRBIxIQAxHGswrnDiSsaGcNT4TQg" />
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>${title}</title>

      <link rel="canonical" href="https://tbeseda.com/">
      <link rel="icon" href="/_public/favicon.ico">
      <link rel="alternate" type="application/rss+xml" title="tbeseda.com Articles" href="/blog/rss">
      <link rel="webmention" href="https://tbeseda.com/webmention">

      ${ogTags}

      <link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" href="${hljsThemeCss}"/>
      <noscript>
        <link rel="stylesheet" href="${hljsThemeCss}"/>
      </noscript>
      <script type="module" src="/_public/highlighter.mjs" defer></script>
      <script type="module" src="/_public/bundles/server-timings.mjs"></script>
      ${snowing > 0 ? '<script type="module" src="/_public/bundles/snow-fall.mjs"></script>' : ''}

      <link rel="stylesheet" href="/_public/css/reset.css">
      <link rel="stylesheet" href="/_public/css/vars.css">
      <link rel="stylesheet" href="/_public/css/styles.css">
      <link rel="stylesheet" href="/_public/css/article.css">

      <style>
        @font-face {
          font-family: Space Mono;
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(/_public/fonts/SpaceMono-Regular.woff2) format("woff2")
        }
        @font-face {
          font-family: Space Mono;
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url(/_public/fonts/SpaceMono-Bold.woff2) format("woff2")
        }
        .title {
          margin-bottom: 2rem;
          font-size: 1.8rem;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
    ${snowing > 0 ? '<snow-fall></snow-fall>' : ''}
  `.trim()
}
