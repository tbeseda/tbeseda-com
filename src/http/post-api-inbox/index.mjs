import arc from '@architect/functions'

export const handler = arc.http.async(async (request) => {
	console.log(`${request.httpMethod} ${request.path}`)

	return {
		html: /*html*/ `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Architect</title>
	<style>
		 * { margin: 0; padding: 0; box-sizing: border-box; }
		 html {
			max-width: 70ch;
			padding: 3em 1em;
			margin: auto;
			line-height: 1.75;
			font-size: 1.25em;
			font-family: -apple-system, BlinkMacSystemFont, sans-serif;
		}
	</style>
</head>
<body>
	<img src="https://assets.arc.codes/logo.svg" />
	<h1>Hello from an Architect Node.js function!</h1>
	<p>Get started by editing this file at: <code>./src/http/get-index/index.mjs</code></p>
	<p>View <a href="https://arc.codes" target="_blank">Architect documentation</a></p>
</body>
</html>
`,
	}
})
