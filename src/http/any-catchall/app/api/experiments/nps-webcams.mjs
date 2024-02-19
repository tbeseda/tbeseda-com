import process from 'node:process'

// https://www.nps.gov/subjects/developer/api-documentation.htm#/webcams

const { NPS_KEY } = process.env
const NPS_API = 'https://developer.nps.gov/api/v1'
const NPS_WEBCAMS = new URL(`${NPS_API}/webcams`)

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get({ query: { stateCode = 'CO' } = {} }) {
  if (!NPS_KEY) throw new Error('Missing NPS_KEY')

  const qs = new URLSearchParams({
    api_key: NPS_KEY,
    stateCode,
  })

  const response = await fetch(`${NPS_WEBCAMS}?${qs}`)
  const json = await response.json()

  let cams = json?.data || []
  cams = cams
    .filter((cam) => cam.status === 'Active')
    .filter(({ url }) => url.startsWith('https://www.nps.gov/media/webcam/view.htm'))

  for await (const cam of cams) {
    const response = await fetch(cam.url)
    const htmlString = await response.text()
    // search for <img id="webcamRefreshImage"
    const imgLines = linesAround(htmlString, 'id="webcamRefreshImage"', 3)
    const srcLine = imgLines.find((line) => line.includes('src='))
    const src = srcLine.match(/src="([^"]+)"/)[1]
    cam.src = src
  }

  return {
    json: { cams },
  }
}

function linesAround(body, substr, nLines) {
  const lines = body.split('\n')
  let foundI = -1

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(substr)) {
      foundI = i
      break
    }
  }

  if (foundI === -1) {
    return 'Substring not found'
  }

  const start = Math.max(0, foundI - nLines)
  const end = Math.min(lines.length, foundI + nLines + 1)
  return lines.slice(start, end)
}
