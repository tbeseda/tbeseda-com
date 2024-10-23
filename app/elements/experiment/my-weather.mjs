/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentMyWeather({ html, state: { store } }) {
  const { weather: weatherData } = store

  const weather = weatherData.find(({ key }) => key === 'tomorrow-io')
  const airNow = weatherData.find(({ key }) => key === 'airnow')
  const iqAir = weatherData.find(({ key }) => key === 'iqair')

  function airNowRow(entry) {
    const { DateObserved, HourObserved, LocalTimeZone, ParameterName, AQI, Category } = entry
    const { Name } = Category
    const date = new Date(DateObserved)
    date.setHours(HourObserved)

    return `
<tr>
  <td>${ParameterName}</td>
  <td>${AQI}</td>
  <td>${Name}</td>
</tr>
<tr>
  <td></td>
  <td colspan="2">${date.toLocaleString()} ${LocalTimeZone}</td>
</tr>`
  }

  return weather && airNow && iqAir
    ? html`
<style>
  :host {
    display: block;
    min-width: 80%;
    margin: 0 auto;
  }
  h2 {
    margin-bottom: 0;
  }
  h3 {
    font-size: 0.9rem;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 3rem;
  }
</style>

<h2>Weather (Tomorrow.io)</h2>
<h3>${new Date(weather.created).toLocaleString()} UTC</h3>
<table>
  <thead>
    <tr>
      <th></th>
      <th>Value</th>
      <th>Unit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Temperature</td>
      <td>${weather.values.temperature}</td>
      <td>°C</td>
    </tr>
    <tr>
      <td>Humidity</td>
      <td>${weather.values.humidity}</td>
      <td>%</td>
    </tr>
    <tr>
      <td>Wind Speed</td>
      <td>${weather.values.windSpeed}</td>
      <td>km/h</td>
    </tr>
    <tr>
      <td></td>
      <td colspan="2">${new Date(weather.time).toLocaleString()} UTC</td>
    </tr>
  </tbody>
</table>

<h2>Air Quality (AirNow)</h2>
<h3>${new Date(airNow.created).toLocaleString()} UTC</h3>
<table>
  <thead>
    <tr>
      <th></th>
      <th>Value</th>
      <th>Quality</th>
    </tr>
  </thead>
  <tbody>
    ${airNow.data.map(airNowRow).join('')}
  </tbody>
</table>

<h2>Air Quality (IQAir)</h2>
<h3>${new Date(iqAir.created).toLocaleString()} UTC</h3>
<table>
  <thead>
    <tr>
      <th></th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${iqAir.current.pollution.mainus}</td>
      <td>${iqAir.current.pollution.aqius}</td>
    </tr>
    <tr>
      <td></td>
      <td >${new Date(iqAir.current.pollution.ts).toLocaleString()} UTC</td>
    </tr>
  </tbody>
</table>`
    : 'no data'
}
