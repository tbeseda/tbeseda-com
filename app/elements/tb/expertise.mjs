/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbExpertise({ html }) {
	return html`
		<section class="grid col-1 col-2-lg gap1">
			<aside class="">
				<h3 class="text1 font-semibold mb-3">
					Server-side Javascript
				</h3>
				<p class="font-serif leading1">
					Though I'm a fan of several programming languages, nothing is as
					prevalent today as JS. I jumped on the Node.js train early on
					and have enjoyed the ever-evolving (sometimes chaotic) ecosystem
					ever since: monolithic web APIs, serverless architecture,
					new runtimes, et. all.
				</p>
			</aside>

			<aside class="">
				<h3 class="text1 font-semibold mb-3">
					Technical Writing
				</h3>
				<p class="font-serif leading1">
					Taking complex software systems down to their fundamentals to
					effectively explain how something works and how to use it.
					Whether it's a guided blog post or technical documentation, I
					like to create reference material to help other developers
					understand a piece of software.
				</p>
			</aside>

			<aside class="">
				<h3 class="text1 font-semibold mb-3">
					System Integration
				</h3>
				<p class="font-serif leading1">
					Connecting the dots with reliable and pliable pipelines. ETL,
					warehousing, data portability, reporting, real-time updates.
					From one platform to another. Custom or off-the-shelf, I make
					sure orgs have the right information in the right place.
				</p>
			</aside>

			<aside class="">
				<h3 class="text1 font-semibold mb-3">
					Interactive Applications
				</h3>
				<p class="font-serif leading1">
					It can't all be back-end magic. At the end of the day, humans
					are why we build things and they need to be able to use our
					software. I enjoy building interactive programs of all sizes.
					From robust customer-facing apps to slim command line interfaces
					for developers.
				</p>
			</aside>
		</section>
	`
}
