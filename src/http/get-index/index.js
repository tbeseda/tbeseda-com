const arc = require('@architect/functions');

async function handler() {
  const client = await arc.tables();
  const tbesedaThings = client.things;
  const fortnite = await tbesedaThings.get({ thingID: 'fortnite' });
  const github = await tbesedaThings.get({ thingID: 'github' });
  const letterboxd = await tbesedaThings.get({ thingID: 'letterboxd' });

  return {
    fortnite,
    github,
    letterboxd,
  };
}

exports.handler = arc.http.async(handler);
