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

  const profile = github?.data?.user || {
    user: {
      avatarUrl:
        'https://avatars.githubusercontent.com/u/15697?u=64bcbfb2f2ce642a7a7294fcaffd01ef986508e0&v=4',
      bio: 'Colorado Front Range. Node.js thrill-seeker.',
      company: '@beginner-corp ',
      location: 'Longmont, CO',
      login: 'tbeseda',
      name: 'Taylor Beseda',
      url: 'https://github.com/tbeseda',
    },
  };

  // console.log(profile);

  return {
    html: await eta.renderFile('index.html', {
      static: arc.static,
      fortnite,
      github,
      letterboxd,
      profile,
    }),
  };
}

exports.handler = arc.http.async(handler);
