import arc from '@architect/functions';
import render from '@architect/views/render.mjs';
import defaultProfile from '@architect/views/default-profile.mjs';

async function http() {
  let fortnite, github, letterboxd, profile;

  try {
    const tbThings = (await arc.tables()).things;

    fortnite = (await tbThings.get({ thingID: 'fortnite' })).data;
    github = (await tbThings.get({ thingID: 'github' })).data;
    letterboxd = (await tbThings.get({ thingID: 'letterboxd' })).data;

    profile = github?.user;
  } catch (error) {
    console.log(error);
    profile = defaultProfile;
  }

  const html = render({
    initialState: {
      fortnite,
      github,
      letterboxd,
      profile,
    },
    body: `<tb-main></tb-main>`,
  });

  return { html };
}

export const handler = arc.http.async(http);
