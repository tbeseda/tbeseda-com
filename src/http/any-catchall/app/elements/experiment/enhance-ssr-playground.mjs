/** @type {import('@enhance/types').EnhanceElemFn} */
export default function EnhanceSsrPlayground({ html }) {
  const codeString = `const html = createHtmlRenderer({
    initialState: {
      name: 'Axol',
    },
    elements: {
      'hello-world': function ({ html, state }) {
        const { attrs, store } = state
        const { name = 'you' } = store
        const { greeting = 'Hello' } = attrs

        return html\`
          &lt;style&gt;
            :host {
              display: block;
              font-family: Comic Sans MS;
            }
            h2 {
              color: red;
            }
          &lt;/style&gt;

          &lt;h2&gt;\${greeting}, \${name}.&lt;/h2&gt;
        \`
      },
    },
  })

  const result = html\`&lt;hello-world greeting="Hi"&gt;&lt;/hello-world&gt;\``

  return html`
<h1>Enhance SSR Playground</h1>

<iframe id="preview" width="50%" height="300px"></iframe>

<pre><code class="language-js">${codeString}</code></pre>

<script type="module" src="/_public/bundles/enhance-ssr-playground.mjs"></script>
`
}
