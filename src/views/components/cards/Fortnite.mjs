import { jsx } from 'nano-jsx';

export default function Fortnite({ data }) {
  const fortnite = data;

  return jsx/* html */ `
    <div class="flex-1 md:text-center">
      <h2 class="text-xl">Fortnite Stats</h2>
      <h2 class="tracking-wider text-sm text-gray-400 mb-4">Current season</h2>
      <h3 class="text-begin-coral font-medium sm:text-4xl text-3xl mb-1">
        ${fortnite.stats.curr_p9.top1.value}
      </h3>
      <p class="leading-relaxed text-gray-100">
        #1 Wins
      </p>
    </div>
  `;
}
