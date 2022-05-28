export default function NewFlipCard({ html }) {
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
        >
          ↯
        </a>
      </slot>

      <div
        class="
          p-6
          shadow-md
          bg-CO-blue-400
          text-gray-400
          rounded-md
        "
      >
        <slot name="front" class="front">✋ front</slot>
      </div>

      <div
        class="
          hidden
          p-6
          shadow-lg
          bg-gray-100
          text-gray-500
          rounded-md
        "
      >
        <slot name="back" class="back">🤚 back</slot>
      </div>
    </div>

    <script type="module">
      import BaseElement from '/_bundles/base-element.mjs';

      class NewFlipCard extends BaseElement {
        constructor() {
          super();

          let flipped = false;

          const button = this.querySelector('a.absolute');
          const front = this.querySelector('[slot="front"]');
          const back = this.querySelector('[slot="back"]');

          console.log({ element: this, button, front, back });

          button.addEventListener('click', () => {
            flipped = !flipped;
            front.style.display = flipped ? 'none' : 'block';
            back.style.display = flipped ? 'block' : 'none';
          });
        }
      }

      customElements.define('new-flip-card', NewFlipCard);
    </script>
  `;
}
