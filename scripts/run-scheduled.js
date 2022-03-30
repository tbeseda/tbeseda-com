const github = require('../src/scheduled/update-github');
const letterboxd = require('../src/scheduled/update-letterboxd');
const fortnite = require('../src/scheduled/update-fortnite');

async function main() {
  github.handler();
  console.log('updated github');
  letterboxd.handler();
  console.log('updated letterboxd');
  fortnite.handler();
  console.log('updated fortnite');
}

main();
