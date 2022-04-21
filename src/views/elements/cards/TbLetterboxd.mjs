export default function TbLetterboxd({ html, state }) {
  const { letterboxd } = state?.store || {};
  const { description, link, title } = letterboxd;
  const parsed = description.match(/<p>(.*?)<\/p?>/gim);
  const imageSrc = parsed[0].match(/<img.*?src="(.*?)"/)[1];
  const review = parsed[1];

  return html`
    <flip-card>
      <div
        slot="front"
        class="p-6 shadow-md bg-colorado-blue-400 text-slate-400 rounded-md"
      >
        <h2 class="text-xl text-slate-100">Movie Activity</h2>
        <h2 class="tracking-wider text-sm text-slate-500 mb-4">
          via Letterboxd
        </h2>
        <h2 class="mb-2 text-l">
          <a class="underline text-slate-200" target="_blank" href="${link}">
            ${title.replace(/★/g, '⭐')}
          </a>
          <span class="text-xs">&nbsp;/5</span>
        </h2>
        <div class="text-left text-sm text-slate-300 mb-2">${review}</div>
      </div>
      <div
        slot="back"
        class="p-6 shadow-lg bg-gray-100 text-slate-500 rounded-md"
      >
        <img
          alt="movie poster"
          class="object-cover object-center rounded-sm inline-block bg-gray-500 mb-2"
          src="${imageSrc}"
        />
      </div>
    </flip-card>
  `;
}
