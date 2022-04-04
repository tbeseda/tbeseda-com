const { TRN_API_KEY } = process.env;
const FORTNITE_API_URL =
  'https://api.fortnitetracker.com/v1/profile/gamepad/troutsoda';

import arc from '@architect/functions';
import got from 'got';

export async function handler() {
  try {
    const response = await got({
      url: FORTNITE_API_URL,
      headers: {
        'TRN-Api-Key': TRN_API_KEY,
      },
    }).json();

    if (response?.accountId) {
      const client = await arc.tables();
      const tbesedaThings = client.things;

      await tbesedaThings.put({
        thingID: 'fortnite',
        data: response,
        updatedAt: Date.now(),
      });
    } else {
      console.log('Broken response', response);
    }
  } catch (error) {
    console.log('Error', error);
  }

  return;
}
