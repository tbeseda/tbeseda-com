import arc from '@architect/functions';
// import countGoats from '@architect/shared/count-goats.mjs';
import render from '@architect/views/render.mjs';
import defaultProfile from '@architect/views/default-profile.mjs';

async function http() {
  let initialState = {
    fortnite: {},
    github: {},
    letterboxd: {},
    profile: defaultProfile,
  };

  try {
    const tbThings = (await arc.tables()).things;

    const fortnite = await tbThings.get({ thingID: 'fortnite' });
    const github = await tbThings.get({ thingID: 'github' });
    const letterboxd = await tbThings.get({ thingID: 'letterboxd' });

    initialState.fortnite = fortnite || {};
    initialState.github = github;
    initialState.letterboxd = letterboxd;

    if (github?.data?.user) initialState.profile = github.data.user;
  } catch (error) {
    console.log(error);
  }

  const html = render({
    initialState,
    body: `<tb-main></tb-main>`,
  });

  return { html };
}

export const handler = arc.http.async(http);
