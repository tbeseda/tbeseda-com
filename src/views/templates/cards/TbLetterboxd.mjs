export default function TbLetterboxd({ html, state }) {
  const { letterboxd } = state?.store || {};
  const { description, link, title } = letterboxd;
  const parsed = description.match(/<p>(.*?)<\/p?>/gim);
  const imageSrc = parsed[0].match(/<img.*?src="(.*?)"/)[1];
  const review = parsed[1];

  return html/* html */ `
    <div>
      <h2 class="text-xl">Movie Activity</h2>
      <h2 class="tracking-wider text-sm text-gray-400 mb-4">via Letterboxd</h2>
      <div class="grid md:grid-flow-col auto-cols-auto gap-x-3 justify-center">
        <div class="">
          <img
            alt="movie poster"
            class="object-cover object-center rounded-sm inline-block bg-gray-100 mb-2"
            src="${imageSrc}"
          />
        </div>

        <div class="text-left">
          <h2 class="mb-2 text-l">
            <a class="underline" target="_blank" href="${link}">
              ${title.replace(/★/g, '⭐')}
            </a>
            <span class="text-gray-500 text-xs"> /5</span>
          </h2>
          <div class="text-left text-sm text-gray-400 mb-2">${review}</div>
        </div>
      </div>
    </div>
  `;
}
