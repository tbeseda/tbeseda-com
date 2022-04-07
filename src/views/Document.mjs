import Nano, { Helmet, jsx } from 'nano-jsx';

import App from './components/App.mjs';

export default function Document(data) {
  const app = Nano.renderSSR(jsx`<${App} data=${data}></${App}>`);
  const { body, head, footer, attributes } = Helmet.SSR(app);

  return /* html */ `
<!DOCTYPE html>
<html ${attributes.html.toString()}>
  <head>
    ${head.join('\n')}
  </head>
  <body ${attributes.body.toString()} class="min-h-screen font-source-sans-pro bg-colorado-blue text-gray-200">
    ${body}
    ${footer.join('\n')}
  </body>
</html>
  `.trim();
}
