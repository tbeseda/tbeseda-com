/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbLinks({ html, state: { store } }) {
	const { links } = store

	return html`
		<nav>
			<ul>
				${links
					.map(
						(link) => /* html */ `
							<li>
								<a href="https://${link.url}" target="_blank">
									${link.url}
								</a>
								<p>${link.description}</p>
							</li>
						`,
					)
					.join('')}
			</ul>
		</nav>
	`
}
