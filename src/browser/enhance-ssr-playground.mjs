import styleTransform from '@enhance/enhance-style-transform'
import enhance from '@enhance/ssr'

function createHtmlRenderer({ elements, initialState }) {
  const html = enhance({
    styleTransforms: [styleTransform],
    elements,
    initialState,
  })

  return html
}

const $preview = document.getElementById('preview')
$preview.src = 'about:blank' // establish same-origin

const html = createHtmlRenderer({
  initialState: {
    name: 'Axol',
  },
  elements: {
    'hello-world': ({ html, state }) => {
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
