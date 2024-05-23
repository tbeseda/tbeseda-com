/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get() {
  return {
    json: {
      head: /* html */ `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Monospace CSS</title>
  <link rel="stylesheet" href="/_public/css/monospace.css">
</head>`
    }
  }
}
