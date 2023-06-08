import arc from '@architect/functions'

const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	const myAqi = await things.get({ key: 'my-aqi' })

	delete myAqi?.iqAirData?.data?.location
	delete myAqi?.iqAirData?.data?.city
	myAqi?.airNowData?.forEach((d) => {
		delete d?.Longitude
		delete d?.Latitude
		delete d?.ReportingArea
	})

	return { json: { myAqi } }
}
