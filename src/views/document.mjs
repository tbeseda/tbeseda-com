import arc from '@architect/functions';

export default function document({
  initialState = { profile: {} },
  body = '',
}) {
  const { profile } = initialState;

  return /* html */ `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏔️</text></svg>"/>
        <title>${profile.name} (@${profile.login})</title>
        <link href="${arc.static('/style.css')}" rel="stylesheet" />
        <style>
          footer { background-image: url(${arc.static('/peaks.svg')}); }
        </style>
      </head>

      <body class="min-h-screen font-source-sans-pro bg-CO-blue text-gray-200">
        ${body}
        <script async src="//gc.zgo.at/count.js" data-goatcounter="https://tbeseda.goatcounter.com/count"></script>
      </body>
    </html>
  `;
}
