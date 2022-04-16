export default function TbFortnite({ html, state }) {
  const { fortnite } = state?.store || {};

  return html`
    <div>
      <flip-card>
        <div slot="front">
          <h2 class="text-xl">Fortnite Stats</h2>
          <h2 class="tracking-wider text-sm text-gray-400 mb-4">
            Current season
          </h2>
          <h3 class="text-begin-coral font-medium sm:text-4xl text-3xl mb-1">
            ${fortnite.stats.curr_p9.top1.value}
          </h3>
          <p class="leading-relaxed text-gray-100">#1 Wins</p>
        </div>

        <div slot="back">
          <!-- <p>back stuff</p> -->
        </div>
      </flip-card>
    </div>
  `;
}
