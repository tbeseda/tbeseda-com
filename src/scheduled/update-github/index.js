const { GITHUB_KEY } = process.env;
const GITHUB_API_URL = 'https://api.github.com/graphql';

const arc = require('@architect/functions');
const tiny = require('tiny-json-http');

exports.handler = async function scheduled() {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  const query = `#graphql
{
  user(login: "tbeseda") {
    avatarUrl
    bio
    company
    location
    login
    name
    url
    itemShowcase {
      items(last: 6) {
        nodes {
          __typename
          ... on Repository {
            descriptionHTML
            primaryLanguage {
              name
            }
            nameWithOwner
            stargazerCount
            url
            repositoryTopics(first: 4) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
    status {
      createdAt
      emoji
      emojiHTML
      indicatesLimitedAvailability
      message
      updatedAt
    }
    contributionsCollection(
      from: "${weekAgo.toISOString()}"
      to: "${today.toISOString()}"
    ) {
      contributionCalendar {
        weeks {
          firstDay
          contributionDays {
            color
            date
            contributionCount
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
