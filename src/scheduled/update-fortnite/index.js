const { TRN_API_KEY } = process.env;
const FORTNITE_API_URL =
  'https://api.fortnitetracker.com/v1/profile/gamepad/troutsoda';

const arc = require('@architect/functions');
const tiny = require('tiny-json-http');

exports.handler = async function scheduled() {
  try {
    const response = await tiny.get({
      url: FORTNITE_API_URL,
      headers: {
        'TRN-Api-Key': TRN_API_KEY,
      },
    });

    if (response?.body) {
      const client = await arc.tables();
      const tbesedaThings = client.things;

      await tbesedaThings.put({
        thingID: 'fortnite',
        data: response.body,
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
