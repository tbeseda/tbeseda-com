import { jsx } from 'nano-jsx';

export default function GitHub({ data }) {
  const { user } = data;

  return jsx/* html */ `
    <div class="flex-1 md:text-center">
      <h2 class="text-xl">GitHub Contributions</h2>

      <h3 class="tracking-wider text-sm text-gray-400 mb-4">Last 7 days</h3>

      <ul class="text-gray-300 text-left md:w-1/2 mx-auto mb-2">
        <li>
          <span class="text-gray-400">commits:</span>
          ${user.contributionsCollection.totalCommitContributions}
        </li>
        <li>
          <span class="text-gray-400">issues:</span>
          ${user.contributionsCollection.totalIssueContributions}
        </li>
        <li>
          <span class="text-gray-400">PRs:</span>
          ${user.contributionsCollection.totalPullRequestContributions}
        </li>
      </ul>

      <h4 class="text-sm italic text-gray-400">"${user.status.message}"</h4>
    </div>

  `;
}
