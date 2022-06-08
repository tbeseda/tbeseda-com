export default function TbFortnite({ html, state }) {
  const { fortnite } = state?.store || {};
  const currentStats = fortnite.stats?.p9;

  return html`
    <flip-card>
      <div slot="front">
        <h2 class="text-xl text-gray-100">Fortnite Stats</h2>
        <h2 class="tracking-wider text-sm text-gray-500 mb-4">
          Current season
        </h2>
        <h3 class="text-begin-coral font-medium sm:text-4xl text-3xl mb-1">
          ${currentStats?.top1?.value || '?'}
        </h3>
        <p class="leading-relaxed text-gray-300">#1 Wins</p>
      </div>

      <div slot="back">
        <h3 class="text-green-pickup font-medium sm:text-4xl text-3xl mb-1">
          ${currentStats?.kd?.value || '?'}
        </h3>
        <p class="leading-relaxed text-gray-600">K/D</p>
      </div>
    </flip-card>
  `;
}
