// eslint-disable-next-line import/no-absolute-path
import createHtmlRenderer from '/_public/bundles/create-enhance-html.mjs'

const $preview = document.getElementById('preview')
$preview.src = 'about:blank' // establish same-origin

const html = createHtmlRenderer({
  initialState: {
    name: 'Axol',
  },
  elements: {
    'hello-world': function ({ html, state }) {
      const { attrs, store } = state
      const { name = 'you' } = store
      const { greeting = 'Hello' } = attrs

      return html`
<style>
  :host {
    display: block;
    font-family: Comic Sans MS;
  }
  h2 {
    color: red;
  }
</style>

<h2>${greeting}, ${name}.</h2>
`
    },
  },
})

const result = html`<hello-world greeting="Hi"></hello-world>`

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow
const { document: previewDoc } = $preview.contentWindow
previewDoc.open()
previewDoc.write(result)
previewDoc.close()
