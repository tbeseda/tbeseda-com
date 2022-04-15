export default function TbLinks({ html }) {
  return html/* html */ `
    <nav class="md:w-4/5 md:mx-auto mb-5 md:text-center">
      <ul class="list-none flex md:flex-row flex-col gap-5">
        <li class="flex-1 text-xl">
          <a
            href="https://github.com/tbeseda"
            target="_blank"
            class="underline font-semibold text-begin-orange"
          >
            github.com/tbeseda
          </a>
          <p class="text-sm">Public and open source work.</p>
        </li>
        <li class="flex-1 text-xl">
          <a
            href="https://dev.to/tbeseda"
            target="_blank"
            class="underline font-semibold text-begin-orange"
          >
            dev.to/tbeseda
          </a>
          <p class="text-sm">Technical writing, snippets & guides.</p>
        </li>
        <li class="flex-1 text-xl">
          <a
            href="https://www.polywork.com/tbeseda"
            target="_blank"
            class="underline font-semibold text-begin-orange"
          >
            polywork.com/tbeseda
          </a>
          <p class="text-sm">A newer professional space with less "hustle".</p>
        </li>
      </ul>
    </nav>
  `;
}
