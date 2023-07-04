/** @type {import('@enhance/types').EnhanceHeadFn} */
export default function Head(state) {
	const { req, store } = state
	const { path } = req
	const { icon } = store
	const title = `Taylor Beseda ${path}`
	const hljsThemeCss =
		'https://unpkg.com/@highlightjs/cdn-assets@11.7.0/styles/night-owl.min.css'

	return /* html */ `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="color-scheme" content="dark light">

			<title>${title}</title>

			<link rel="canonical" href="https://tbeseda.com/">
			<link rel="icon" href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>'/>
			<link rel="alternate" type="application/rss+xml" title="tbeseda.com Articles" href="/articles/rss"/>
			<link rel="webmention" href="https://tbeseda.com/webmention" />

			<link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" href="${hljsThemeCss}"/>
			<noscript>
				<link rel="stylesheet" href="${hljsThemeCss}"/>
			</noscript>

			<link rel="stylesheet" href="/_public/typesafe.css">

			<style>
				body {
					max-width: 88ch;
					background-color: #efefef;
					color: #333;
					font-family: Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif;
					font-size: 1.1rem;
				}
				h1, h2, h3, h4, h5, h6 {
					font-weight: 600;
				}
				a {
					color: #000;
				}
				a:visited {
					color: #000;
				}

				.hidden {
					display: none;
				}

				pre {
					border: none;
				}

				code {
					font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
					color: aliceblue;
				}

				kbd {
					display: inline-block;
					min-width: 0.75rem;
					margin: 0 0.2rem;
					padding: 0.2rem 0.3rem 0.1rem;
					border: 1px solid rgb(204, 204, 204);
					border-radius: 0.25rem;
					font-size: 0.8rem;
					line-height: 1;
					color: #333;
					background-color: #eee;
					text-shadow: 0 1px 0 #fff;
				}

				@media (prefers-color-scheme: dark) {
					body {
						background-color: #151515;
						color: #ccc;
					}
					a {
						color: #fff;
					}
					a:visited {
						color: #fff;
					}
					a:hover {
						color: #fff;
					}
				}
			</style>
		</head>
		<body>
	`
}
