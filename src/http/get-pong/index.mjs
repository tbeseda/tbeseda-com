import arc from '@architect/functions'

async function get(req, ctx) {
  return {
    html: /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Architect</title>
  <style>
     * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; } .max-width-320 { max-width: 20rem; } .margin-left-8 { margin-left: 0.5rem; } .margin-bottom-16 { margin-bottom: 1rem; } .margin-bottom-8 { margin-bottom: 0.5rem; } .padding-32 { padding: 2rem; } .color-grey { color: #333; } .color-black-link:hover { color: black; }
  </style>
</head>
<body class="padding-32">
  <div class="max-width-320">
    <img src="https://assets.arc.codes/logo.svg" />
    <div class="margin-left-8">
      <div class="margin-bottom-16">
        <h1 class="margin-bottom-16">
          Hello from an Architect Node.js function!
        </h1>
        <p class="margin-bottom-8">
          Get started by editing this file at:
        </p>
        <code>
          src/http/get-ping/index.mjs
        </code>
      </div>
      <div>
        <p class="margin-bottom-8">
          View documentation at:
        </p>
        <code>
          <a class="color-grey color-black-link" href="https://arc.codes">https://arc.codes</a>
        </code>
        <pre><code>req: ${JSON.stringify(req, null, 2)}</code></pre>
        <pre><code>ctx: ${JSON.stringify(ctx, null, 2)}</code></pre>
      </div>
    </div>
  </div>
</body>
</html>
`,
  }
}

export const handler = arc.http(get)
