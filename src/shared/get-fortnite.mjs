import arc from '@architect/functions';
import got from 'got';

const { TRN_API_KEY } = process.env;
const FORTNITE_API_URL =
  'https://api.fortnitetracker.com/v1/profile/gamepad/troutsoda';

export default async function () {
  let thing = null;

  const response = await got({
    url: FORTNITE_API_URL,
    headers: {
      'TRN-Api-Key': TRN_API_KEY,
    },
  }).json();

  if (response?.accountId) {
    const client = await arc.tables();
    const tbesedaThings = client.things;
    thing = response;

    await tbesedaThings.put({
      thingID: 'fortnite',
      data: thing,
      updatedAt: Date.now(),
    });
  } else {
    console.log('Broken fn response', response);
  }

  return thing;
}