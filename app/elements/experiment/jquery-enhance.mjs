export default function JQueryEnhance({ html }) {
  return html`
<h2>jQuery with Enhance</h2>
<h3>jQuery in a web component served by Enhance</h3>

<table>
  <tr>
    <td>jQuery version</td>
    <td id="jquery-version">Loading...</td>
  </tr>
</table>

<script type="module">
  if (!window.jQuery || !window.customElements)
    throw new Error('jQuery not found')

  class JQueryEnhance extends HTMLElement {
    constructor () {
      super()
      this.$ = window.jQuery
      this.$$ = this.$(this)
      this.$versionCell = this.$$.find('#jquery-version')
    }
    connectedCallback () {
      this.$versionCell.text(this.$.fn.jquery)
    }
  }
  customElements.define('experiment-jquery-enhance', JQueryEnhance)
</script>
<script src="https://code.jquery.com/jquery-4.0.0-beta.slim.min.js"></script>
`
}
