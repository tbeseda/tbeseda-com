import arc from '@architect/functions';

async function http(request) {
  return {
    statusCode: 200,
    headers: {
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json',
    },
    body: JSON.stringify(request, null, 2),
  };
}

export const handler = arc.http.async(http);
