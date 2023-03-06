import { getStyles } from '@enhance/arc-plugin-styles'

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

			<title>${title}</title>

			<link rel="canonical" href="https://tbeseda.com/">
			<link rel="icon" href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>'/>
			<link rel="alternate" type="application/rss+xml" title="tbeseda.com Articles" href="/articles/rss"/>
			<link rel="webmention" href="https://tbeseda.com/webmention" />

			<link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" href="${hljsThemeCss}"/>
			<noscript>
				<link rel="stylesheet" href="${hljsThemeCss}"/>
			</noscript>

			${process.env.ARC_SANDBOX ? getStyles.linkTag() : getStyles.styleTag()}
			<!-- <link rel="stylesheet" href="/_public/tufte.css"/> -->

			<style>
				/* adapted from https://github.com/edwardtufte/tufte-css/blob/gh-pages/tufte.css */
				html {
					font-size: 16px;
				}

				body {
					width: 87.5%;
					margin-left: auto;
					margin-right: auto;
					padding-left: 12.5%;
					max-width: 1400px;
					background-color: var(--light);
				}

				/* Adds dark mode */
				@media (prefers-color-scheme: dark) {
					body {
						background-color: #151515;
						color: #ddd;
					}
				}

				@media (max-width: 760px) {
					body {
						width: 100%;
						padding-left: 4%;
						padding-right: 4%;
					}
				}

				a {
					color: var(--greenpickup-500);
					text-decoration: underline;
				}
			</style>
		</head>
		<body class="grid content-start font-sans">
	`
}
