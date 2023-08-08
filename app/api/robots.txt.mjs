/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	const lines = `
User-agent: *
Disallow: /sekret
Disallow: /sekret/
Disallow: /sekret/*

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /
`

	return {
		text: lines.trim(),
	}
}
