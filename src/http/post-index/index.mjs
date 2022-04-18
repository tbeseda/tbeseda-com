import arc from '@architect/functions';
import getGithub from '@architect/shared/get-github.mjs';
import getLetterboxd from '@architect/shared/get-letterboxd.mjs';
import getFortnite from '@architect/shared/get-fortnite.mjs';

const { ARC_APP_SECRET, ARC_ENV } = process.env;

async function http(event) {
  const {
    body: { secret = '' },
  } = event;

  if (ARC_ENV === 'testing' || (secret && secret === ARC_APP_SECRET)) {
    const gitHubThing = await getGithub();
    const letterboxdThing = await getLetterboxd();
    const fortniteThing = await getFortnite();

    return {
      ok: true,
      gitHubThing,
      letterboxdThing,
      fortniteThing,
    };
  } else {
    return { status: 500, json: { ok: false } };
  }
}

export const handler = arc.http.async(http);
