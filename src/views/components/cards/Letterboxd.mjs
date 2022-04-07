import { jsx } from 'nano-jsx';

export default function Letterboxd({ data }) {
  const letterboxd = data;
  const { link, title } = letterboxd;
  const parsed = letterboxd.description.match(/<p>(.*?)<\/p?>/gim);
  const imageSrc = parsed[0].match(/<img.*?src="(.*?)"/)[1];
  const description = parsed[1];

  return jsx/* html */ `
    <div class="flex-1 md:text-center">
      <h2 class="text-xl">Movie Activity</h2>
      <h2 class="tracking-wider text-sm text-gray-400 mb-4">via Letterboxd</h2>
      <div class="grid md:grid-flow-col auto-cols-auto gap-x-3 justify-center">
        <div class="">
          <img
            alt="movie poster"
            class="object-cover object-center rounded-sm inline-block bg-gray-100 mb-2"
            src="${imageSrc}" />
        </div>

        <div class="text-left">
          <h2 class="mb-2 text-l">
            <a
              class="underline"
              target="_blank"
              href="${link}"
            >
              ${title.replace(/★/g, '⭐')}
            </a>
            <span class="text-gray-500 text-xs"> /5</span>
          </h2>
          <div class="text-left text-sm text-gray-400 mb-2">
            ${jsx([description])}
          </div>
        </div>
      </div>
    </div>
  `;
}
