import arc from '@architect/functions';
import parser from 'rss-url-parser';

const LETTERBOXD_RSS_URL = 'https://letterboxd.com/tbeseda/rss/';

export default async function () {
  let thing = null;

  try {
    const response = await parser(LETTERBOXD_RSS_URL);

    if (response) {
      const client = await arc.tables();
      const tbesedaThings = client.things;
      const recentEntry = response[0];
      thing = {
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

  return thing;
}
