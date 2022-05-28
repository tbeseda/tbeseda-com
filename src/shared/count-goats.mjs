import got from 'got';

const { GOATCOUNTER_DOMAIN, GOATCOUNTER_API_KEY } = process.env;

export default async function (request, context) {
  const { headers, path, rawQueryString } = request;
  const { referer } = headers;
  const ip = context.identity?.sourceIp;
  const userAgent = context.identity?.userAgent;

  console.log({ ip, userAgent, referer });

  try {
    const response = await got(`https://${GOATCOUNTER_DOMAIN}/api/v0/count`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GOATCOUNTER_API_KEY}`,
      },
      json: {
        hits: [
          {
            path,
            ip,
            ref: 'LAMBDA',
            session: 'LAMBDA',
            user_agent: userAgent,
            query: '?' + rawQueryString,
          },
        ],
      },
    });
  } catch (error) {
    console.error('GoatCounter error', error);
  }
}
