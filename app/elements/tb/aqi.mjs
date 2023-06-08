/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbAqi({ html, state: { store } }) {
	const { myAqi } = store
	const { airNowData } = myAqi || { airNowData: [] }
	const pm25 = airNowData?.find(
		({ ParameterName }) => ParameterName === 'PM2.5',
	) || {
		ParameterName: '?',
		AQI: 'unknown',
		Category: { Name: '?' },
	}

	return html`
		<h1>My AQI</h1>
		<p>My AQI (${pm25.ParameterName}): ${pm25.AQI} - ${pm25.Category.Name}</p>
		<h2>Raw Data</h2>
		<pre>${JSON.stringify(myAqi, null, 2)}</pre>
		`
}
