/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state: { store } }) {
	const { article } = store

	return html`
		<style>
			/* https://github.com/edwardtufte/tufte-css/blob/gh-pages/tufte.css */
			h1 {
				font-weight: 400;
				margin-top: 4rem;
				margin-bottom: 1.5rem;
				font-size: 3.2rem;
				line-height: 1;
			}

			h2 {
				font-style: italic;
				font-weight: 400;
				margin-top: 2.1rem;
				margin-bottom: 1.4rem;
				font-size: 2.2rem;
				line-height: 1;
			}

			h3 {
				font-style: italic;
				font-weight: 400;
				font-size: 1.7rem;
				margin-top: 2rem;
				margin-bottom: 1.4rem;
				line-height: 1;
			}
			article {
				padding: 5rem 0rem;
			}

			section {
				padding-top: 1rem;
				padding-bottom: 1rem;
			}

			p,
			dl,
			ol,
			ul {
				font-size: 1.4rem;
				line-height: 2rem;
			}

			p {
				margin-top: 1.4rem;
				margin-bottom: 1.4rem;
				padding-right: 0;
				vertical-align: baseline;
			}

			div.epigraph {
				margin: 5em 0;
			}

			div.epigraph > blockquote {
				margin-top: 3em;
				margin-bottom: 3em;
			}

			div.epigraph > blockquote,
			div.epigraph > blockquote > p {
				font-style: italic;
			}

			div.epigraph > blockquote > footer {
				font-style: normal;
			}

			div.epigraph > blockquote > footer > cite {
				font-style: italic;
			}

			blockquote {
				font-size: 1.4rem;
			}

			blockquote p {
				width: 55%;
				margin-right: 40px;
			}

			blockquote footer {
				width: 55%;
				font-size: 1.1rem;
				text-align: right;
			}

			section > p,
			section > footer,
			section > table {
				width: 55%;
			}

			/* 50 + 5 == 55, to be the same width as paragraph */
			section > dl,
			section > ol,
			section > ul {
				width: 50%;
				-webkit-padding-start: 5%;
			}

			dt:not(:first-child),
			li:not(:first-child) {
				margin-top: 0.25rem;
			}

			figure {
				padding: 0;
				border: 0;
				font-size: 100%;
				font: inherit;
				vertical-align: baseline;
				max-width: 55%;
				-webkit-margin-start: 0;
				-webkit-margin-end: 0;
				margin: 0 0 3em 0;
			}

			figcaption {
				float: right;
				clear: right;
				margin-top: 0;
				margin-bottom: 0;
				font-size: 1.1rem;
				line-height: 1.6;
				vertical-align: baseline;
				position: relative;
				max-width: 40%;
			}

			/* Sidenotes, margin notes, figures, captions */
			img {
				max-width: 100%;
			}

			.sidenote,
			.marginnote {
				float: right;
				clear: right;
				margin-right: -60%;
				width: 50%;
				margin-top: 0.3rem;
				margin-bottom: 0;
				font-size: 1.1rem;
				line-height: 1.3;
				vertical-align: baseline;
				position: relative;
			}

			.sidenote-number {
				counter-increment: sidenote-counter;
			}

			.sidenote-number:after,
			.sidenote:before {
				font-family: et-book-roman-old-style;
				position: relative;
				vertical-align: baseline;
			}

			.sidenote-number:after {
				content: counter(sidenote-counter);
				font-size: 1rem;
				top: -0.5rem;
				left: 0.1rem;
			}

			.sidenote:before {
				content: counter(sidenote-counter) " ";
				font-size: 1rem;
				top: -0.5rem;
			}

			blockquote .sidenote,
			blockquote .marginnote {
				margin-right: -82%;
				min-width: 59%;
				text-align: left;
			}

			div.fullwidth,
			table.fullwidth {
				width: 100%;
			}

			div.table-wrapper {
				overflow-x: auto;
				font-family: "Trebuchet MS", "Gill Sans", "Gill Sans MT", sans-serif;
			}

			.sans {
				font-family: "Gill Sans", "Gill Sans MT", Calibri, sans-serif;
				letter-spacing: .03em;
			}

			code, pre > code {
				font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
				font-size: 1.0rem;
				line-height: 1.42;
				-webkit-text-size-adjust: 100%; /* Prevent adjustments of font size after orientation changes in iOS. See https://github.com/edwardtufte/tufte-css/issues/81#issuecomment-261953409 */
			}

			.sans > code {
				font-size: 1.2rem;
			}

			h1 > code,
			h2 > code,
			h3 > code {
				font-size: 0.80em;
			}

			.marginnote > code,
			.sidenote > code {
				font-size: 1rem;
			}

			pre > code {
				font-size: 0.9rem;
				width: 52.5%;
				margin-left: 2.5%;
				overflow-x: auto;
				display: block;
			}

			pre.fullwidth > code {
				width: 90%;
			}

			.fullwidth {
				max-width: 90%;
				clear:both;
			}

			span.newthought {
				font-variant: small-caps;
				font-size: 1.2em;
			}

			input.margin-toggle {
				display: none;
			}

			label.sidenote-number {
				display: inline-block;
				max-height: 2rem; /* should be less than or equal to paragraph line-height */
			}

			label.margin-toggle:not(.sidenote-number) {
				display: none;
			}

			@media (max-width: 760px) {
				hr,
				section > p,
				section > footer,
				section > table {
					width: 100%;
				}

				pre > code {
					width: 97%;
				}

				section > dl,
				section > ol,
				section > ul {
					width: 90%;
				}

				figure {
					max-width: 90%;
				}

				figcaption {
					margin-right: 0%;
					max-width: none;
				}

				blockquote {
					margin-left: 1.5em;
					margin-right: 0em;
				}

				blockquote p,
				blockquote footer {
					width: 100%;
				}
			}
		</style>

		${article.html}
	`
}
