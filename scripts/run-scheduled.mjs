import { handler as getThings } from '../src/scheduled/update-things/index.mjs'

async function main() {
	await getThings()
	console.log('updated stat things')
}

main()
