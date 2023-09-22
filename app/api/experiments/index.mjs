import standardMiddleware from '../../middleware/common.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
async function getHandler({ hCards = [], currentlyPlaying }) {
	const experiments = [
		{
			name: 'Omnivore.app Linkblog',
			date: '2023',
			description: 'My Omnivore.app Reading List. Features recently saved articles, highlights, and all-time favorites.',
			url: '/experiments/omnivore',
			featured: true,
		},
		{
			name: 'AWS Lambda Runtimes',
			date: '2023',
			description: 'A view that fetches a "hello world" from 4 different Lambda runtimes: Ruby, Python, Go, and Rust.',
			url: '/experiments/runtimes',
		},
		{
			name: 'Pug Template',
			date: '2023',
			description: 'Render a Pug template in real-time with Enhance.',
			url: '/experiments/pug-template',
		},
		{
			name: 'Random Skull from "Quick, Draw!"',
			date: '2023',
			description: 'Use canvas to draw a skull from the Quick, Draw! dataset.',
			url: '/experiments/skull',
			featured: true,
		},
		{
			name: 'My Spotify Activity',
			date: '2023',
			description: 'Live updates from my listening on Spotify! Also my top tracks and artists.',
			url: '/experiments/spotify',
			featured: true,
		},
		{
			name: 'Article Publishing Demo',
			date: '2023',
			description: 'A proof-of-concept for publishing articles to my site. This ended up being the basis for my custom CMS.',
			url: '/experiments/fake-articles',
		},
		{
			name: '$ terminal',
			date: '2023',
			description: 'A terminal emulator that runs in the browser. Based on xterm.js.',
			url: '/experiments/$',
			featured: true,
		},
		{
			name: 'Article Publishing with Vrite.io',
			date: '2023',
			description: 'I used Vrite.io to author content and automatically ingest and cache it here. (Dependent on Vrite.io API.)',
			url: '/experiments/vrite',
		},
		{
			name: 'My Local Air Quality Index',
			date: '2023',
			description: 'Raw JSON data from AirNow.gov and IQAir.com for my local AQI.',
			url: '/experiments/aqi',
		},
		{
			name: 'h-card Custom Element',
			date: '2023',
			description: 'h-card Custom Element',
			url: '/h-card',
		},
	]

	return {
		json: {
			icon: '👨🏻‍🔬',
			hCards,
			currentlyPlaying,
			experiments: experiments.sort((e) => e.featured ? -1 : 1)
		},
	}
}

export const get = [...standardMiddleware, getHandler]
