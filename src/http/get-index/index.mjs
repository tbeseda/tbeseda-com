/** @type {import('@architect/functions').HttpHandler} */
export const handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'max-age=300, must-revalidate',
    },
    body: page(),
  }
}

function page() {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Taylor Beseda</title>
  <meta name="description" content="Taylor Beseda — software engineer, web developer, tbeseda">
  <link rel="icon" href="/_public/favicon.ico">
  <link rel="webmention" href="https://tbeseda.com/webmention">
  <meta name="fediverse:creator" content="@tbeseda@indieweb.social">
  <meta name="google-site-verification" content="5yKJt5rGoKcFXspMRBIxIQAxHGswrnDiSsaGcNT4TQg">
  <link rel="stylesheet" href="/_public/css/term.css">
</head>
<body>
  <div class="terminal-window">
    <div class="title-bar">
      <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
      <span class="title">tbeseda.com — term</span>
    </div>
    <div id="terminal-container">
      <div id="loading">loading wasm…</div>
    </div>
  </div>

  <script type="module" src="/_public/js/term.mjs"></script>
</body>
</html>`
}
