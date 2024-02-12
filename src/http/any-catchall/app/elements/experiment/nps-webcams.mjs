/** @type {import('@enhance/types').EnhanceElemFn} */
export default function NpsWebcams ({ html, state: { store } }) {
  const { cams } = store

  return html`
    <style>
      :host {
        display: block;
      }
    </style>

    <h1>NPS Webcams</h1>

    <c-grid cols="1_1_1">
      ${cams.map(cam => `
        <div>
          <h2>
            <a href="${cam.url}" target="_blank" rel="noopener">
              ${cam.title}
            </a>
          </h2>
          <img src="${cam.src}" alt="${cam.title}" />
          <ul role="list">
            <li>Latitude: ${cam.latitude}</li>
            <li>Longitude: ${cam.longitude}</li>
            <li>POI ID: ${cam.geometryPoiId}</li>
            <li>Status: ${cam.status}</li>
            <li>Status Message: ${cam.statusMessage}</li>
            <li>Streaming: ${cam.isStreaming}</li>
            <li>Tags: ${cam.tags.join(', ')}</li>
            <li>Park Name: ${cam.relatedParks.map(park => `${park.fullName} - ${park.parkCode}`).join(', ')}</li>
            <li>Designation: ${cam.relatedParks.map(park => park.designation).join(', ')}</li>
          </ul>
        </div>
      `).join('')}
    </c-grid>
  `
}
