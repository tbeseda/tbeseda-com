/** @type {import('@enhance/types').EnhanceElemFn} */
export default function EnhanceSsrPlayground ({ html }) {
  return html`
<h1>Enhance SSR Playground</h1>

<iframe id="preview" width="50%" height="300px"></iframe>

<script type="module" src="/_public/browser/enhance-ssr-playground.mjs"></script>
`
}
