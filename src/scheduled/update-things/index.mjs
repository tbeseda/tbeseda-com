import getFortnite from '@architect/shared/get-fortnite.mjs';
import getGithub from '@architect/shared/get-github.mjs';
import getLetterboxd from '@architect/shared/get-letterboxd.mjs';

export async function handler() {
  const gitHubThing = await getGithub();
  const letterboxdThing = await getLetterboxd();
  const fortniteThing = await getFortnite();

  return {
    gitHubThing,
    letterboxdThing,
    fortniteThing,
  };
}
