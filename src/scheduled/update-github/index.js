const { GITHUB_KEY } = process.env;
const GITHUB_API_URL = 'https://api.github.com/graphql';

const arc = require('@architect/functions');
const tiny = require('tiny-json-http');

exports.handler = async function scheduled() {
  const query = `
{
  user(login: "tbeseda") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            weekday
            date
          }
        }
      }
    }
  }
}
  `.trim();

  try {
    const response = await tiny.post({
      url: GITHUB_API_URL,
      data: { query },
      headers: {
        Authorization: `Bearer ${GITHUB_KEY}`,
      },
    });

    if (response?.body) {
      const client = await arc.tables();
      const tbesedaThings = client.things;

      await tbesedaThings.put({
        thingID: 'github',
        data: response.body.data,
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
