import arc from '@architect/functions'
import standardMiddleware from '../../middleware/common.mjs'

const { things } = await arc.tables()

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ icon = '⛔️', hCards = [], currentlyPlaying }) {
	const myAqi = await things.get({ key: 'my-aqi' })

	delete myAqi?.iqAirData?.data?.location
	delete myAqi?.iqAirData?.data?.city
	myAqi?.airNowData?.forEach((d) => {
		delete d?.Longitude
		delete d?.Latitude
		delete d?.ReportingArea
	})

	return { json: { icon, hCards, currentlyPlaying, myAqi } }
}

export const get = [...standardMiddleware, getHandler]
