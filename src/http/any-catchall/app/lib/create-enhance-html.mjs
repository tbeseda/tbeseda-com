import enhance from '@enhance/ssr'
import styleTransform from '@enhance/enhance-style-transform'

export default function createHtmlRenderer ({ elements, initialState }) {
  const html = enhance({
    styleTransforms: [styleTransform],
    elements,
    initialState,
  })

  return html
}
