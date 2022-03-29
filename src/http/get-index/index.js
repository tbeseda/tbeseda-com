const arc = require('@architect/functions');
const eta = require('eta');
const path = require('path');

async function handler() {
  const client = await arc.tables();
  const tbesedaThings = client.things;
  const fortnite = await tbesedaThings.get({ thingID: 'fortnite' });
  const github = await tbesedaThings.get({ thingID: 'github' });
  const letterboxd = await tbesedaThings.get({ thingID: 'letterboxd' });

  eta.configure({
    views: path.join(__dirname, 'node_modules', '@architect/views'),
  });

  return {
    html: await eta.renderFile('index.html', {
      fortnite,
      github,
      letterboxd,
    }),
  };
}

exports.handler = arc.http.async(handler);
