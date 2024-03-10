import styleTransform from '@enhance/enhance-style-transform'
import enhance from '@enhance/ssr'

export default function createHtmlRenderer({ elements, initialState }) {
  const html = enhance({
    styleTransforms: [styleTransform],
    elements,
    initialState,
  })

  return html
}
