import arc from '@architect/functions';
import document from '@architect/views/document.mjs';
import defaultProfile from '@architect/views/default-profile.mjs';

async function http() {
  const client = await arc.tables();
  const tbesedaThings = client.things;

  const fortnite = await tbesedaThings.get({ thingID: 'fortnite' });
  const github = await tbesedaThings.get({ thingID: 'github' });
  const letterboxd = await tbesedaThings.get({ thingID: 'letterboxd' });

  const profile = github?.data?.user || defaultProfile;

  return {
    html: document({
      profile,
      github,
      fortnite,
      letterboxd,
    }),
  };
}

export const handler = arc.http.async(http);
