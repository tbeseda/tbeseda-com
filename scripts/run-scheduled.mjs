import { handler as github } from '../src/scheduled/update-github/index.mjs';
import { handler as letterboxd } from '../src/scheduled/update-letterboxd/index.mjs';
import { handler as fortnite } from '../src/scheduled/update-fortnite/index.mjs';

async function main() {
  github();
  console.log('updated github');
  letterboxd();
  console.log('updated letterboxd');
  fortnite();
  console.log('updated fortnite');
}

main();
