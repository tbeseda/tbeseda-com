import arc from '@architect/functions';
let counter = 0;

async function http(request) {
  counter++;

  return {
    json: { counter, request },
  };
}

export const handler = arc.http.async(http);
