// import arc from '@architect/functions'

const { SEKRET } = process.env

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get({ session }) {
	let { authorized } = session
	authorized = !!authorized

	return {
		json: { authorized },
		session,
	}
}

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function post({ body, session }) {
	const { password } = body
	const authorized = password === SEKRET
	const newSession = { ...session, authorized }

	return authorized
		? {
				status: 302,
				headers: { location: '/sekret' },
				session: newSession,
		  }
		: {
				status: 401,
				json: { error: 'Unauthorized' },
				session: newSession,
		  }
}
