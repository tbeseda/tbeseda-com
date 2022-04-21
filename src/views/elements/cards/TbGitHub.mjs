export default function TbGitHub({ html, state }) {
  const { github } = state?.store || {};
  const { user } = github || {};
  const parsedEmoji = user?.status?.emojiHTML.match(
    /<g-emoji .*?>(.*?)<\/g-emoji>/im
  ) || ['', '?'];
  const emoji = parsedEmoji[1];

  return html`
    <flip-card>
      <div
        slot="front"
        class="p-6 shadow-md bg-colorado-blue-400 text-gray-400 rounded-md"
      >
        <h2 class="text-xl text-gray-100">GitHub Contributions</h2>

        <h3 class="tracking-wider text-sm text-gray-500 mb-4">Last 7 days</h3>

        <ul class="text-left md:w-1/2 mx-auto">
          <li>
            <span class="text-gray-200">commits:</span>
            ${user.contributionsCollection.totalCommitContributions}
          </li>
          <li>
            <span class="text-gray-200">issues:</span>
            ${user.contributionsCollection.totalIssueContributions}
          </li>
          <li>
            <span class="text-gray-200">PRs:</span>
            ${user.contributionsCollection.totalPullRequestContributions}
          </li>
        </ul>
      </div>
      <div
        slot="back"
        class="p-6 shadow-lg bg-gray-100 text-gray-500 rounded-md"
      >
        <h4 class="text-sm">
          <span class="text-gray-600">Status:</span> ${emoji}
          "${user.status.message}"
        </h4>
      </div>
    </flip-card>
  `;
}
