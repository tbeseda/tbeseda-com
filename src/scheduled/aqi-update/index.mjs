import arc from '@architect/functions'

const { MY_LAT, MY_LON, AIRNOW_KEY, IQAIR_KEY } = process.env
const AIRNOW_URL = `https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${MY_LAT}&longitude=-${MY_LON}&distance=25&API_KEY=${AIRNOW_KEY}`
const IQAIR_URL = `https://api.airvisual.com/v2/nearest_city?lat=${MY_LAT}&lon=-${MY_LON}&key=${IQAIR_KEY}`

const { things } = await arc.tables()

export async function handler () {
  const iqAirResponse = await fetch(IQAIR_URL)
  const iqAirData = await iqAirResponse.json()

  const airNowResponse = await fetch(AIRNOW_URL)
  const airNowData = await airNowResponse.json()

  const saved = await things.put({
    key: 'my-aqi',
    type: 'aqi',
    iqAirData,
    airNowData,
  })

  console.log('saved', saved.key)
}
