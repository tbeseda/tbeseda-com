function timestamp (duration) {
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const seconds = Math.floor((duration / 1000) % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ExperimentSpotify ({ html, state: { store } }) {
  const {
    authorized,
    currentlyPlaying,
    recentlyPlayed = { items: [] },
    topArtists = { items: [] },
    topTracks = { items: [] },
    messages,
  } = store
  const playing = currentlyPlaying?.item
  const mostRecent = recentlyPlayed.items?.shift()
  const theRest = recentlyPlayed.items

  function presentDate (date) {
    const d = new Date(date)
    const timeZone = 'America/Denver'
    return `${d.toLocaleString('en', { timeZone })}`
  }

  return html`
    <style>
      details {
        margin-top: 2rem;
      }
      details > div {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 1.5rem;
      }
      .row {
        display: grid;
        grid-template-columns: auto 1fr auto auto;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem;
      }
      .row.dense {
      }
      .row.denser {
        border-bottom: 1px solid #333;
        padding: 0.25rem 0;
      }
      .row.track {
        grid-template-columns: auto 1fr auto;
      }
      .row.artist {
        grid-template-columns: 1fr auto;
      }
      .row.denser:last-of-type {
        border-bottom: none;
      }
      img {
        max-height: 120px;
        max-width: 120px;
      }
      img.album-cover {
        box-shadow: var(--shadow);
      }
      .dense img {
        max-height: 75px;
        max-width: 75px;
      }
      .denser img {
        max-height: 50px;
        max-width: 50px;
      }
      .album-info {
        text-align: right;
      }
    </style>

    ${authorized ? '<p><a href="/auth/spotify/login">re-auth</a></p>' : ''}

    <h2>My Spotify Activity</h2>

    ${messages?.map((message) => `<p>${message}</p>`).join('')}

    ${
      playing
        ? /* html */ `
              <h3>Currently Playing</h3>
              <div class="">
                <div class="row track">
                  <img class="album-cover" src="${playing.album.images[0].url}" alt="album cover" />
                  <span class="track-info">
                    <strong class="track-name">${playing.name}</strong><br>
                    <span class="artist">
                      ${playing.artists.map(({ name }) => name).join(', ')}
                    </span><br>
                    ${playing.album.name} (${playing.album.release_date.split('-')[0]})
                  </span>
                  <span class="album-info">
                    <span class="playing-progress">
                      ${
                        currentlyPlaying.is_playing
                          ? '&#9658;'
                          : '&#9616;&nbsp;&#9612;'
                      }
                      ${timestamp(currentlyPlaying.progress_ms)} /
                      ${timestamp(playing.duration_ms)}
                    </span>
                  </span>
                </div>
              </div>
            `.trim()
        : ''
    }

    <h3>Recently Played</h3>
    <div class="">
      ${
        mostRecent
          ? /* html */ `
              <div class="row track">
                <img class="album-cover" src="${mostRecent.track.album.images[0].url}" alt="album cover" />
                <span class="track-info">
                  <strong class="track-name">${mostRecent.track.name}</strong><br>
                  <span class="artist">
                    ${mostRecent.track.artists.map(({ name }) => name).join(', ')}
                  </span><br>
                  ${mostRecent.track.album.name} (${mostRecent.track.album.release_date.split('-')[0]})
                </span>
                <span class="album-info">
                  <span>${presentDate(mostRecent.played_at)}</span>
                </span>
              </div>
            `.trim()
          : ''
      }
      ${
        theRest.length > 0
          ? theRest
              .map(
                (item) => /* html */ `
                  <div class="row track dense">
                    <img class="album-cover" src="${item.track.album.images[0].url}" alt="album cover" />
                    <span class="track-info">
                      <strong class="track-name">${item.track.name}</strong><br>
                      <span class="artist">
                        ${item.track.artists.map(({ name }) => name).join(', ')}
                      </span><br>
                      ${item.track.album.name} (${item.track.album.release_date.split('-')[0]})
                    </span>
                    <span class="album-info">
                      <span>${presentDate(item.played_at)}</span>
                    </span>
                  </div>
                `,
              )
              .join('')
          : ''
      }
    </div>

    <details>
      <summary>More Stats</summary>
      <c-grid cols="1_2">
        <div>
          <h3>Top Artists</h3>
          ${topArtists.items
            .map(
              ({ name, images }, i) => `
              <div class="row artist denser">
                <span>${i + 1}. ${name}</span>
                ${
                  images.length
                    ? `<img src="${images[0].url}" alt="image of ${name}" />`
                    : ''
                }
              </div>
            `,
            )
            .join('')}
        </div>
        <div>
          <h3>Top Tracks</h3>
          ${topTracks.items
            .map(
              ({ name, artists, album }, i) => `
              <div class="row track denser">
                <span class="track-name">${i + 1}. <strong>${name}</strong></span>
                <span class="artist">
                  ${artists.map(({ name }) => name).join(', ')}
                </span>
                <img class="album-cover" src="${album.images[0].url}" alt="album cover" />
              </div>
              `,
            )
            .join('')}
        </div>
      </c-grid>
    </details>
  `
}
