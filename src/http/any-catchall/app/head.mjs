/** @type {import('@enhance/types').EnhanceHeadFn} */
export default function Head({ store }) {
  const { title, myWeather } = store
  const hljsThemeCss = 'https://unpkg.com/@highlightjs/cdn-assets@11.7.0/styles/night-owl.min.css'

  const snowing = myWeather?.values.snowIntensity

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
  `
}
