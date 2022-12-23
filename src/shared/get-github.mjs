import arc from '@architect/functions';
import got from 'got';

const { GITHUB_KEY } = process.env;
const GITHUB_API_URL = 'https://api.github.com/graphql';

const today = new Date();
const weekAgo = new Date();
weekAgo.setDate(today.getDate() - 7);

const query = /* gql */`
{
  user(login: "tbeseda") {
    avatarUrl
    bio
    company
    companyHTML
    location
    login
    name
    url
    contributionsCollection(
      from: "${weekAgo.toISOString()}"
      to: "${today.toISOString()}"
    ) {
      startedAt
      endedAt
      restrictedContributionsCount
      totalIssueContributions
      totalCommitContributions
      totalPullRequestContributions
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
    # itemShowcase {
    #   items(last: 6) {
    #     nodes {
    #       __typename
    #       ... on Repository {
    #         descriptionHTML
    #         primaryLanguage {
    #           name
    #         }
    #         nameWithOwner
    #         stargazerCount
    #         url
    #         repositoryTopics(first: 4) {
    #           nodes {
    #             topic {
    #               name
    #             }
    #           }
    #         }
    #       }
    #     }
    #   }
    # }
    status {
      createdAt
      emoji
      emojiHTML
      indicatesLimitedAvailability
      message
      updatedAt
    }
  }
}
  `.trim();

export default async function () {
  let thing = null;

  const response = await got
    .post({
      url: GITHUB_API_URL,
      json: { query },
      headers: {
        Authorization: `Bearer ${GITHUB_KEY}`,
      },
    })
    .json();

  if (response?.data) {
    const client = await arc.tables();
    const tbesedaThings = client.things;
    thing = response.data;

    await tbesedaThings.put({
      thingID: 'github',
      data: response.data,
      updatedAt: Date.now(),
    });
  } else {
    console.log('Broken response', response);
  }

  return thing;
}
