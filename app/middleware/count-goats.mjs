import got from 'got';

const { GOATCOUNTER_DOMAIN, GOATCOUNTER_API_KEY } = process.env;

export default async function (request) {
  const { headers, path, rawQueryString } = request;
  const { referer, 'x-forwarded-for': ip, 'user-agent': userAgent } = headers;
  console.log(headers);

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
            ref: referer,
            session: ip ? null : 'LAMBDA',
            user_agent: userAgent,
            // query: '?' + rawQueryString,
          },
        ],
      },
    });
  } catch (error) {
    console.error('GoatCounter error', error);
  }
}
