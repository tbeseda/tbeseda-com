export default function TbFortnite({ html, state }) {
  const { fortnite } = state?.store || {};

  return html`
    <flip-card>
      <div
        slot="front"
        class="p-6 shadow-md bg-colorado-blue-400 text-gray-400 rounded-md"
      >
        <h2 class="text-xl text-gray-100">Fortnite Stats</h2>
        <h2 class="tracking-wider text-sm text-gray-500 mb-4">
          Current season
        </h2>
        <h3 class="text-begin-coral font-medium sm:text-4xl text-3xl mb-1">
          ${fortnite.stats.curr_p9.top1.value}
        </h3>
        <p class="leading-relaxed text-gray-300">#1 Wins</p>
      </div>

      <div
        slot="back"
        class="p-6 shadow-lg bg-gray-100 text-gray-500 rounded-md"
      >
        <h3 class="text-green-pickup font-medium sm:text-4xl text-3xl mb-1">
          ${fortnite.stats.curr_p9.kd.value}
        </h3>
        <p class="leading-relaxed text-gray-600">K/D</p>
      </div>
    </flip-card>
  `;
}
