import arc from '@architect/functions'

const { MY_LAT, MY_LON, AIRNOW_KEY, IQAIR_KEY } = process.env
const AIRNOW_URL = [
  'https://www.airnowapi.org/aq/observation/latLong/current/',
  '?format=application/json&distance=25',
  `&latitude=${MY_LAT}&longitude=-${MY_LON}`,
  `&API_KEY=${AIRNOW_KEY}`,
].join('')
const IQAIR_URL = [
  'https://api.airvisual.com/v2/nearest_city',
  `?lat=${MY_LAT}&lon=-${MY_LON}`,
  `&key=${IQAIR_KEY}`,
].join('')

const { things } = await arc.tables()

export async function handler() {
  const results = []

  try {
    const response = await fetch(AIRNOW_URL)
    const data = await response.json()

    const thing = await things.put({
      key: 'airnow',
      type: 'weather',
      data,
      created: new Date().toISOString(),
    })

    results.push(thing)
  } catch (error) {
    console.error('Error fetching AirNow data', error)
  }

  try {
    const response = await fetch(IQAIR_URL)
    const { data } = await response.json()

    const thing = await things.put({
      key: 'iqair',
      type: 'weather',
      ...data,
      created: new Date().toISOString(),
    })

    results.push(thing)
  } catch (error) {
    console.error('Error fetching IQAir data', error)
  }

  return results
}
