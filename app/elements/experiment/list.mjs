import { Collection } from 'waylon'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function List({ html, state: { store } }) {
	const { experiments = [] } = store
	const collection = new Collection(experiments)

	return html`
		<style>
			:host {
				display: block;
			}
			.experiment {
				display: flex;
				flex-direction: column;
			}
			.experiment.featured {
				box-shadow: 0 0 3px 1px color-mix(in srgb, var(--accent) 66%, transparent);
			}
			.experiment * {
				margin: 0;
				padding: 0;
			}
			.experiment a {
				font-size: 1.5rem;
				font-weight: 600;
			}
			.experiment time {
				font-size: 0.8em;
				margin-bottom: 0.5rem;
			}
		</style>

		<c-grid cols="1_1">
			${collection.render(
				'div',
				(i) => i.attrs({ class: `experiment${i.i.featured ? ' featured' : ''}` }),
				(item) => `
					${item.link(item.i.url, item.i.name)}
					<!--<time>${item.i.date}</time>-->
					<p>${item.i.description}</p>
				`,
			)}
		</c-grid>
	`
}
