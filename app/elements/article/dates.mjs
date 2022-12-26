/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state: { store } }) {
	const {
		article: { published, edited },
	} = store

	function presentDate(string) {
		return new Date(string).toLocaleString('en-US', {
			timeZone: 'MST',
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		})
	}

	return html`
		<time class="dt-published text-1" datetime="${published}">
			${presentDate(published)}
		</time>
		${
			edited
				? /* html */ `
						<div class="mt-4 text-2" style="color: var(--black-300);">
							Edited:
							<time class="dt-updated" datetime="${edited}">
								${presentDate(edited)}
							</time>
						</div>
					`
				: ''
		}
	`
}
