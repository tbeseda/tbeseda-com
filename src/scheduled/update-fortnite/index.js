const { FORTNITEAPI_IO_ACCOUNT, FORTNITEAPI_IO_KEY } = process.env;
const FORTNITE_API_URL = 'https://fortniteapi.io/v1/stats';

const arc = require('@architect/functions');
const tiny = require('tiny-json-http');

exports.handler = async function scheduled() {
  try {
    const response = await tiny.get({
      url: FORTNITE_API_URL,
      data: {
        account: FORTNITEAPI_IO_ACCOUNT,
        season: 'current',
      },
      headers: {
        Authorization: FORTNITEAPI_IO_KEY,
      },
    });

    if (response?.body?.result) {
      const client = await arc.tables();
      const tbesedaThings = client.things;

      const fortniteThing = await tbesedaThings.put({
        thingID: 'fortnite',
        data: response.body,
        updatedAt: Date.now(),
      });

      console.log(fortniteThing);
    } else {
      console.log('Broken response', response);
    }
  } catch (error) {
    console.log('Error', error);
  }

  return;
};
