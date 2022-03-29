const LETTERBOXD_RSS_URL = 'https://letterboxd.com/tbeseda/rss/';

const arc = require('@architect/functions');
const parser = require('rss-url-parser');

exports.handler = async function scheduled() {
  try {
    const response = await parser(LETTERBOXD_RSS_URL);

    if (response) {
      const client = await arc.tables();
      const tbesedaThings = client.things;
      const recentEntry = response[0];
      const thing = {
        title: recentEntry.title,
        description: recentEntry.description,
        date: recentEntry.date,
        link: recentEntry.link,
      };

      await tbesedaThings.put({
        thingID: 'letterboxd',
        data: thing,
        updatedAt: Date.now(),
      });
    } else {
      console.log('Broken response', response);
    }
  } catch (error) {
    console.log('Error', error);
  }

  return;
};
