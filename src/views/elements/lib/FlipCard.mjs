export default function FlipCard({ html }) {
  return html`
    <style>
      :host {
        display: block;
        position: relative;
      }
      [slot='front'] {
        /* this works, but... */
      }
    </style>

    <slot name="flipper">
      <a class="absolute bottom-1 right-2 cursor-pointer text-colorado-blue-100"
        >↯</a
      >
    </slot>

    <slot name="front">
      <h2>Default Front</h2>
    </slot>
    <slot name="back" style="display: none;">
      <h2>Default Back</h2>
    </slot>

    <script type="module">
      class FlipCard extends HTMLElement {
        constructor() {
          super();

          const template = document.getElementById('flip-card-template');
          const shadowRoot = this.attachShadow({ mode: 'open' });

          shadowRoot.appendChild(template.content.cloneNode(true));

          let flipped = false;
          const button = shadowRoot.querySelector('slot[name="flipper"]');
          const front = shadowRoot.querySelector('slot[name="front"]');
          const back = shadowRoot.querySelector('slot[name="back"]');

          button.addEventListener('click', () => {
            flipped = !flipped;
            front.style.display = flipped ? 'none' : 'block';
            back.style.display = flipped ? 'block' : 'none';
          });
        }
      }

      customElements.define('flip-card', FlipCard);
    </script>
  `;
}
