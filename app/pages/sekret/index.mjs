/** @type {import('@enhance/types').EnhanceElemFn} */
export default function Secret({ html, state: { store } }) {
	let { authorized } = store
	authorized = !!authorized

	return html`
		<h1>Sekret</h1>
		${
			authorized
				? '<a href="/sekret/blog">Manage Blog</a>'
				: /*html*/ `
					<form method="post">
						<label for="password">Password</label>
						<input type="password" name="password" id="password" />
						<button type="submit">Submit</button>
					</form>`
		}
	`
}
