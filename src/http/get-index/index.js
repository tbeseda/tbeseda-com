const arc = require('@architect/functions');

async function handler() {
  const client = await arc.tables();
  const tbesedaThings = client.things;
  const fortnite = await tbesedaThings.get({ thingID: 'fortnite' });

  return {
    fortnite,
  };
}

exports.handler = arc.http.async(handler);
