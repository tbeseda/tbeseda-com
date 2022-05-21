export default function Main({ html, state }) {
  const { profile } = state?.store || {};

  return html`
    <div>
      <div class="flex flex-col h-screen">
        <header
          class="flex flex-col gap-1 md:mb-12 mb-8 md:mt-14 mt-8 px-5 text-center"
        >
          <div class="grid justify-center">
            <img
              alt="avatar"
              class="w-20 h-20 object-cover object-center rounded-full bg-gray-100"
              src="${profile.avatarUrl}"
            />
          </div>

          <h2 class="text-sm text-gray-400 font-semibold">
            <a href="${profile.url}" target="_blank">
              @<span
                class="uppercase tracking-widest font-bold text-begin-orange"
              >
                ${profile.login}
              </span>
            </a>
          </h2>

          <div class="grid grid-flow-col auto-cols-auto gap-x-1 justify-center">
            <h1 class="text-5xl font-bold text-white">${profile.name}</h1>
          </div>

          <h2 class="text-lg">Web Engineer, DX, & General Technologist</h2>

          <h3 class="text-base text-gray-400">
            Colorado Front Range (${profile.location}) and all over the
            Internet.
          </h3>

          <div
            class="grid grid-flow-col auto-cols-auto gap-x-2 justify-center font-medium title-font tracking-wider text-sm mb-1"
          >
            <span class="text-gray-200">Employed:</span>
            <span class="text-begin-coral"> ${profile.companyHTML} </span>
          </div>
        </header>

        <main class="flex flex-col gap-5 mb-16 md:px-0 px-5">
          <figure
            class="md:w-3/5 md:mx-auto mb-5 bg-CO-blue-100 bg-opacity-40 p-6 rounded"
          >
            <blockquote class="text-2xl italic text-gray-200">
              "I love putting the pieces together. Be it existing parts,
              services I've built, or teaching others how; making things work
              better for people."
            </blockquote>
            <figcaption class="text-center text-gray-400">
              -me, fairly recently
            </figcaption>
          </figure>

          <h2 class="md:hidden text-2xl font-bold text-gray-200">
            Find me online:
          </h2>

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
                <p class="text-sm">
                  A newer professional space with less "hustle".
                </p>
              </li>
            </ul>
          </nav>

          <h2 class="md:hidden text-2xl font-bold text-gray-200">
            What I specialize in:
          </h2>

          <section class="md:w-4/5 md:mx-auto flex flex-wrap">
            <aside
              class="xl:w-1/4 lg:w-1/2 md:w-full p-5 border-l-2 border-opacity-20"
            >
              <h3 class="text-gray-100 text-xl font-semibold mb-3">
                System Integration
              </h3>
              <p class="text-gray-300">
                Connecting the dots with reliable and pliable pipelines. ETL,
                warehousing, data portability, reporting, real-time updates.
                From one platform to another. Custom or off-the-shelf, I make
                sure orgs have the right information in the right place.
              </p>
            </aside>

            <aside
              class="xl:w-1/4 lg:w-1/2 md:w-full p-5 border-l-2 border-opacity-20"
            >
              <h3 class="text-gray-100 text-xl font-semibold mb-3">
                Server-side Javascript
              </h3>
              <p class="text-gray-300">
                Though I'm a fan of several programming languages, nothing is as
                prevalent today as JS. I jumped on the Node.js train early on
                and have enjoyed the ever-evolving (sometimes chaotic) ecosystem
                ever since: monolithic Express APIs, serverless architecture,
                Typescript, Deno, et. all.
              </p>
            </aside>

            <aside
              class="xl:w-1/4 lg:w-1/2 md:w-full p-5 border-l-2 border-opacity-20"
            >
              <h3 class="text-gray-100 text-xl font-semibold mb-3">
                Technical Writing
              </h3>
              <p class="text-gray-300">
                Taking complex software systems down to their fundamentals to
                effectively explain how something works and how to use it.
                Whether it's a guided blog post or technical documentation, I
                like to create reference material to help other developers
                understand a piece of software.
              </p>
            </aside>

            <aside
              class="xl:w-1/4 lg:w-1/2 md:w-full p-5 border-l-2 border-opacity-20"
            >
              <h3 class="text-gray-100 text-xl font-semibold mb-3">
                Interactive Applications
              </h3>
              <p class="text-gray-300">
                It can't all be back-end magic. At the end of the day, humans
                are why we build things and they need to be able to use our
                software. I enjoy building interactive programs of all sizes.
                From robust customer-facing apps to slim command line interfaces
                for developers.
              </p>
            </aside>
          </section>

          <hr class="md:w-4/5 md:mx-auto border-gray-600 mb-5" />

          <section
            class="md:w-4/5 md:mx-auto mb-5 text-center flex md:flex-row flex-col gap-6"
          >
            <tb-github class="flex-1 md:text-center"></tb-github>
            <tb-letterboxd class="flex-1 md:text-center"></tb-letterboxd>
            <tb-fortnite class="flex-1 md:text-center"></tb-fortnite>
          </section>
        </main>

        <footer
          class="
            flex-1
            flex-grow
            text-center
            bg-bottom
            bg-no-repeat
            bg-cover
            pb-44
          "
        >
          <p class="p-1 bg-CO-blue bg-opacity-50">
            Say hi: <code class="text-green-pickup">tbeseda</code> @ gmail<br>
            or on <a class="text-begin-coral" rel="me" href="https://indieweb.social/@tbeseda">Mastodon</a>
          </p>
        </footer>
      </div>
    </div>
  `;
}
