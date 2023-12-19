import arc from '@architect/functions'

const { MY_LAT, MY_LON, TOMORROW_IO_KEY } = process.env
const TOMORROW_IO_URL = [
  'https://api.tomorrow.io/v4/weather/realtime',
  `?location=${MY_LAT},${MY_LON}`,
  `&apikey=${TOMORROW_IO_KEY}`,
].join('')

const { things } = await arc.tables()

export async function handler () {
  let result

  try {
    const response = await fetch(TOMORROW_IO_URL)
    const { data } = await response.json()

    if (response.ok) {
      result = await things.put({
        key: 'tomorrow-io',
        type: 'weather',
        ...data,
        created: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error('Error fetching Tomorrow.io data', error)
  }

  return result
}
