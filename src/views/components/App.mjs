import arc from '@architect/functions';
import { Helmet, jsx } from 'nano-jsx';

import Header from './Header.mjs';
import Links from './Links.mjs';
import Words from './Words.mjs';
import Fortnite from './cards/Fortnite.mjs';
import GitHub from './cards/GitHub.mjs';
import Letterboxd from './cards/Letterboxd.mjs';

export default function App({ data }) {
  const { profile, letterboxd, github, fortnite } = data;

  return jsx/* html */ `
    <div>
      <${Helmet} head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏔️</text></svg>" />
        <title>
          ${profile.name} (@${profile.login})
        </title>
        <link href="${arc.static('/style.css')}" rel="stylesheet" />
        <style>
          footer {
            background-image: url(${arc.static('/peaks.svg')});
          }
        </style>
      </${Helmet}>

      <div class="flex flex-col h-screen">
        <${Header} data=${profile}></${Header}>

        <main class="flex flex-col gap-5 mb-16 md:px-0 px-5">
          <figure class="md:w-3/5 md:mx-auto mb-5 bg-gray-400 bg-opacity-40 p-6 rounded">
            <blockquote class="text-2xl italic text-gray-200">
              "I love putting the pieces together. Be it existing parts, services I've built, or
              teaching others how; making things work better for people."
            </blockquote>
            <figcaption class="text-center text-gray-400">-me, fairly recently</figcaption>
          </figure>

          <h2 class="md:hidden text-2xl font-bold text-gray-200">Find me online:</h2>

          <${Links}></${Links}>

          <${Words}></${Words}>

          <section class="md:w-4/5 md:mx-auto mb-5 md:text-center flex md:flex-row flex-col gap-y-7">
            <${GitHub} data=${github.data}></${GitHub}>
            <${Letterboxd} data=${letterboxd.data}></${Letterboxd}>
            <${Fortnite} data=${fortnite.data}></${Fortnite}>
          </section>
        </main>

        <footer class="flex-1 flex-grow text-center bg-bottom bg-no-repeat bg-cover pb-44">
          <span class="p-3 bg-colorado-blue bg-opacity-20">
            Say hi: <code class="text-green-pickup">tbeseda</code> @ gmail
          </span>
        </footer>
      </div>

      <${Helmet} footer>
        <script data-goatcounter="https://tbeseda.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
      </${Helmet}>
    </div>
  `;
}
