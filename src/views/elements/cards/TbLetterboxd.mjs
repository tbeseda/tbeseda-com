export default function TbLetterboxd({ html, state }) {
  const {
    letterboxd: { data: letterboxd, updatedAt },
  } = state.store;
  const { description, link, title } = letterboxd;
  const parsed = description.match(/<p>(.*?)<\/p?>/gim);
  const imageSrc = parsed[0].match(/<img.*?src="(.*?)"/)[1];
  const review = parsed[1];

  return html`
    <flip-card>
      <div slot="front">
        <h2 class="text-xl text-gray-100">Movie Activity</h2>
        <h2 class="tracking-wider text-sm text-gray-500 mb-4">
          via Letterboxd
        </h2>
        <h2 class="mb-2 text-l">
          <a class="underline text-gray-200" target="_blank" href="${link}">
            ${title.replace(/★/g, '⭐')}
          </a>
          <span class="text-xs">&nbsp;/5</span>
        </h2>
        <div class="text-left text-sm text-gray-300 mb-2">${review}</div>
      </div>

      <div slot="back">
        <img
          alt="movie poster"
          class="object-cover object-center rounded-sm inline-block bg-gray-500 mb-2"
          src="${imageSrc}"
        />
        <p class="text-xs">${new Date(updatedAt).toLocaleString()}</p>
      </div>
    </flip-card>
  `;
}