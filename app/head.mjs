import { getStyles } from '@enhance/arc-plugin-styles'

/** @type {import('@enhance/types').EnhanceHeadFn} */
export default function Head(state) {
  const { req } = state
  const { path } = req
  const title = `tbeseda.com ${path}`

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏔️</text></svg>"/>
      ${getStyles.linkTag()}
      <style>
        body > * {
          max-width: 55rem;
          margin: 0 auto;
          color: var(--dark);
        }
        a {
          color: var(--greenpickup-500);
          text-decoration: underline;
        }
        hr {
          height: 1px;
          width: 75%;
          background: var(--dark);
        }
      </style>
    </head>
    <body class="font-sans">
  `
}
