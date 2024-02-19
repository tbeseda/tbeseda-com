/** @type {import('@enhance/types').EnhanceElemFn} */
export default function AlbumBackground({ html, state: { store } }) {
  const {
    currentlyPlaying: { item },
  } = store
  const images = item.album.images

  let image
  if (item?.album?.images && Array.isArray(images)) {
    // find largest image
    image = images.reduce((prev, curr) => {
      return prev.width > curr.width ? prev : curr
    })
  }

  if (!image) return ''

  return html`
  <style scope="global">
    body {
      background:
        url("${image.url}") no-repeat center top,
        var(--background-color);
      -webkit-backdrop-filter: blur(32px);
      backdrop-filter: blur(32px);
      background-size: cover;
      background-blend-mode: overlay;
    }
  </style>
  `
}
