/** @type {import('@enhance/types').EnhanceElemFn} */
export default function Toot({ html }) {
	return html`
		<style>
			/* Mastodon API sends back HTML with classes */
			.invisible {
				visibility: initial;
			}
		</style>

		<h2 class="text1 font-semibold">Most recently...</h2>
		<div class="toot-content leading1 font-serif">loading...</div>
		<div class="toot-attachments hidden grid flow-col justify-start gap0"></div>

		<script type="module">
			class TbToot extends HTMLElement {
				toot
				constructor() {
					super()
					this.content = this.querySelector('.toot-content')
					this.attachments = this.querySelector('.toot-attachments')
				}

				connectedCallback() {
					this.render()
				}

				async render() {
					const getRecent = await fetch(
						'/toot/get?handle=tbeseda',
						{ headers: { 'Accept': 'application/json' } }
					)
					this.toot = await getRecent.json()

					this.content.innerHTML = this.toot.content
					if (this.toot.sensitive) {
						const summary = document.createElement('p')
						summary.classList.add('mb-1')
						summary.textContent = this.toot.summary
						this.content.prepend(summary)
					}

					const link = document.createElement('a')
					link.href = this.toot.url
					link.target = '_blank'
					link.classList.add('text-1', 'font-sans')
					link.textContent = new Date(this.toot.published).toLocaleString()
					this.append(link)

					if (this.toot.attachment?.length) {
						const imgAttachments = this.toot.attachment
						.filter((a) => a.mediaType.startsWith('image/'))
						.map((a) => {
							const img = document.createElement('img')
							img.src = a.url
							img.width = 300
							img.alt = a.name
							return img
						})
						this.attachments.append(...imgAttachments)
						this.attachments.classList.remove('hidden')
					} else {
						this.attachments.remove()
					}
				}
			}

			customElements.define('tb-toot', TbToot)
		</script>
	`
}
