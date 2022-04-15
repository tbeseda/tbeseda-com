import arc from '@architect/functions';
import enhance from '@enhance/ssr';

import defaultProfile from '@architect/views/default-profile.mjs';

import TbMain from '@architect/views/templates/TbMain.mjs';
import TbHeader from '@architect/views/templates/TbHeader.mjs';
import TbLinks from '@architect/views/templates/TbLinks.mjs';
import TbWords from '@architect/views/templates/TbWords.mjs';
import TbFortnite from '@architect/views/templates/cards/TbFortnite.mjs';
import TbGithub from '@architect/views/templates/cards/TbGitHub.mjs';
import TbLetterboxd from '@architect/views/templates/cards/TbLetterboxd.mjs';

async function http() {
  const client = await arc.tables();
  const tbThings = client.things;
  const fortnite = (await tbThings.get({ thingID: 'fortnite' })).data;
  const github = (await tbThings.get({ thingID: 'github' })).data;
  const letterboxd = (await tbThings.get({ thingID: 'letterboxd' })).data;

  const profile = github?.user || defaultProfile;

  const html = enhance({
    elements: {
      'tb-main': TbMain,
      'tb-header': TbHeader,
      'tb-links': TbLinks,
      'tb-words': TbWords,
      'tb-fortnite': TbFortnite,
      'tb-github': TbGithub,
      'tb-letterboxd': TbLetterboxd,
    },
    initialState: {
      profile,
      fortnite,
      github,
      letterboxd,
    },
  });

  const doc = html/* html */ `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏔️</text></svg>"
        />
        <title>${profile.name} (@${profile.login})</title>
        <link href="${arc.static('/style.css')}" rel="stylesheet" />
        <style>
          footer {
            background-image: url(${arc.static('/peaks.svg')});
          }
        </style>
      </head>

      <body
        class="
          min-h-screen
          font-source-sans-pro
        bg-colorado-blue
        text-gray-200
        "
      >
        <tb-main /></tb-main>
        <script
          async
          src="//gc.zgo.at/count.js"
          data-goatcounter="https://tbeseda.goatcounter.com/count"
        ></script>
      </body>
    </html>
    `;

  return {
    html: doc,
  };
}

export const handler = arc.http.async(http);
