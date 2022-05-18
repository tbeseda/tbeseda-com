export default function FlipCard({ html }) {
  return html`
    <div class="relative">
      <slot name="flipper">
        <a
          class="
            absolute
            bottom-1
            right-2
            cursor-pointer
            text-CO-blue-100
          "
          >↯</a
        >
      </slot>

      <div
        class="
          front
          p-6
          shadow-md
          bg-CO-blue-400
          text-gray-400
          rounded-md
        "
      >
        <slot name="front">✋</slot>
      </div>

      <div
        class="
          back
          hidden
          p-6
          shadow-lg
          bg-gray-100
          text-gray-500
          rounded-md
        "
      >
        <slot name="back">🤚</slot>
      </div>
    </div>

    <script type="module">
      class FlipCard extends HTMLElement {
        constructor() {
          super();

          let flipped = false;

          // ! Shadow DOM doesn't work as expected yet
          // const template = document.getElementById('flip-card-template');
          // const shadowRoot = this.attachShadow({ mode: 'open' });
          // shadowRoot.appendChild(template.content.cloneNode(true));

          // const button = shadowRoot.querySelector('slot[name="flipper"]');
          // const front = shadowRoot.querySelector('slot[name="front"]');
          // const back = shadowRoot.querySelector('slot[name="back"]');

          const button = this.querySelector('[slot="flipper"]');
          const front = this.querySelector('.front');
          const back = this.querySelector('.back');

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
