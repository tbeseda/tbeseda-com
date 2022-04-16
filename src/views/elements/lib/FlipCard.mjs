export default function FlipCard({ html }) {
  return html`
    <style></style>

    <div>
      <slot name="front">
        <h2>Default Front</h2>
      </slot>
      <slot name="back">
        <h2>Default Back</h2>
      </slot>
    </div>

    <script type="module">
      class FlipCard extends HTMLElement {
        constructor() {
          super();

          const template = document.getElementById('flip-card-template');
          //const shadowRoot = this.attachShadow({ mode: 'open' });

          //shadowRoot.appendChild(template.content.cloneNode(true));
        }

        connectedCallback() {
          console.log("flippin'");
        }
      }

      customElements.define('flip-card', FlipCard);
    </script>
  `;
}
