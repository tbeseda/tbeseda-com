export default function Main({ html }) {
  return html/* html */ `
    <div>
      <div class="flex flex-col h-screen">
        <tb-header></tb-header>

        <main class="flex flex-col gap-5 mb-16 md:px-0 px-5">
          <figure
            class="md:w-3/5 md:mx-auto mb-5 bg-gray-400 bg-opacity-40 p-6 rounded"
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

          <tb-links></tb-links>

          <tb-words></tb-words>

          <section
            class="md:w-4/5 md:mx-auto mb-5 md:text-center flex md:flex-row flex-col gap-y-7"
          >
            <tb-github class="flex-1 md:text-center"></tb-github>
            <tb-letterboxd class="flex-1 md:text-center"></tb-letterboxd>
            <tb-fortnite class="flex-1 md:text-center"></tb-fortnite>
          </section>
        </main>

        <footer
          class="flex-1 flex-grow text-center bg-bottom bg-no-repeat bg-cover pb-44"
        >
          <span class="p-3 bg-colorado-blue bg-opacity-20">
            Say hi: <code class="text-green-pickup">tbeseda</code> @ gmail
          </span>
        </footer>
      </div>
    </div>
  `;
}
