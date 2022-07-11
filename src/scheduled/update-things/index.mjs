import getFortnite from '@architect/shared/get-fortnite.mjs';
import getGithub from '@architect/shared/get-github.mjs';
import getLetterboxd from '@architect/shared/get-letterboxd.mjs';

export async function handler() {
  const response = {};

  try {
    console.log('updating gh');
    response.gitHubThing = await getGithub();
  } catch (error) {
    console.log('gh error');
  }

  try {
    console.log('updating lb');
    response.letterboxdThing = await getLetterboxd();
  } catch (error) {
    console.log('lb error');
  }

  try {
    console.log('updating fn');
    response.fortniteThing = await getFortnite();
  } catch (error) {
    console.log('fn error');
  }

  return response;
}
