/** @type {import('@enhance/types').EnhanceHeadFn} */
export default function Head({ req, store }) {
  const { path } = req
  const { head, title, myWeather, article } = store
  const hljsThemeCss = 'https://unpkg.com/@highlightjs/cdn-assets@11.7.0/styles/night-owl.min.css'

  if (head) return head

  const snowing = myWeather?.values.snowIntensity

  let ogTags = ''
  let articleLdJson = ''
  if (article) {
    ogTags = /* html */ `
      <meta property="og:title" content="${article.title}" />
      <meta property="og:description" content="${article.description}" />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://tbeseda.com${path}" />
      <meta property="og:image" content="https://tbeseda.com/og-img/${article.slug}" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="tbeseda" />
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
    articleLdJson = `<script type="application/ld+json">
      ${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `https://tbeseda.com${path}`,
        url: `https://tbeseda.com${path}`,
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        image: `https://tbeseda.com/og-img/${article.slug}`,
        author: {
          '@type': 'Person',
          name: 'Taylor Beseda',
        },
      })}
    </script>`
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
      ${articleLdJson}

      <link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" href="${hljsThemeCss}"/>
      <noscript>
        <link rel="stylesheet" href="${hljsThemeCss}"/>
      </noscript>
      <script type="module" src="/_public/highlighter.mjs" defer></script>
      <script type="module" src="/_public/bundles/server-timings.mjs"></script>
      ${snowing > 0 ? '<script type="module" src="/_public/bundles/snow-fall.mjs"></script>' : ''}

      <!--
      <link rel="stylesheet" href="/_public/css/reset.css">
      <link rel="stylesheet" href="/_public/css/vars.css">
      <link rel="stylesheet" href="/_public/css/styles.css">
      <link rel="stylesheet" href="/_public/css/article.css">
      -->
      <link rel="stylesheet" href="/_public/css/pico.css">

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
        /* https://shkspr.mobi/blog/2024/04/use-css-to-boost-the-font-size-of-emoji-with-no-extra-markup/ */
        @font-face {
          font-family: "emoji";

          src: local('Apple Color Emoji'),
            local('Android Emoji'),
            local('Segoe UI'),
            local('Noto Color Emoji'),
            local(EmojiSymbols),
            local(Symbola);

          unicode-range: U+231A-231B, U+23E9-23EC, U+23F0, U+23F3, U+25FD-25FE, U+2614-2615, U+2648-2653, U+267F, U+2693, U+26A1, U+26AA-26AB, U+26BD-26BE, U+26C4-26C5, U+26CE, U+26D4, U+26EA, U+26F2-26F3, U+26F5, U+26FA, U+26FD, U+2705, U+270A-270B, U+2728, U+274C, U+274E, U+2753-2755, U+2757, U+2795-2797, U+27B0, U+27BF, U+2B1B-2B1C, U+2B50, U+2B55, U+FE0F, U+1F004, U+1F0CF, U+1F18E, U+1F191-1F19A, U+1F1E6-1F1FF, U+1F201, U+1F21A, U+1F22F, U+1F232-1F236, U+1F238-1F23A, U+1F250-1F251, U+1F300-1F320, U+1F32D-1F335, U+1F337-1F393, U+1F3A0-1F3CA, U+1F3CF-1F3D3, U+1F3E0-1F3F0, U+1F3F4, U+1F3F8-1F43E, U+1F440, U+1F442-1F4FC, U+1F4FF-1F53D, U+1F54B-1F567, U+1F57A, U+1F595-1F596, U+1F5A4, U+1F5FB-1F64F, U+1F680-1F6CC, U+1F6D0-1F6D2, U+1F6D5-1F6D7, U+1F6DC-1F6DF, U+1F6EB-1F6EC, U+1F6F4-1F6FC, U+1F7E0-1F7EB, U+1F7F0, U+1F90C-1F93A, U+1F93C-1F945, U+1F947-1FA7C, U+1FA80-1FAC5, U+1FACE-1FADB, U+1FAE0-1FAE8, U+1FAF0-1FAF8;

          size-adjust: 300%;
        }

        @view-transition {
          navigation: auto;
        }

        body {
          font-family: "Space Mono", "emoji";
        }
      </style>
    </head>
    <body>
      <script type="speculationrules">
        {
          "prefetch": [{
            "where": {
              "href_matches": "/*"
            },
            "eagerness": "moderate"
          }]
        }
      </script>
      ${snowing > 0 ? '<snow-fall></snow-fall>' : ''}
      <tb-header></tb-header>
      <main class="container">
  `.trim()
}
