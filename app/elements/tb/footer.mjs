/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbFooter({ html, state: { store } }) {
  const { currentlyPlaying, icon = '' } = store
  return html`
    <style>
      server-timings {
        display: block;
        margin-top: 0.5rem;
        padding: 0.5rem;
        font-family: monospace;
        font-size: 0.6rem;
        color: darksalmon;
        opacity: 0.5;
      }
      server-timings:hover {
        opacity: 1;
        cursor: none;
      }
      server-timings ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
      }
      server-timings li {
        border-right: 1px solid #ccc;
        padding-right: 0.75rem;
      }
      server-timings li:last-child {
        border-right: none;
        padding-right: 0;
      }
    </style>

    <footer class="grid">
      <div>
        &copy; tbeseda ${new Date().getFullYear().toString()}.
      </div>

      ${currentlyPlaying?.item ? '<tb-spotify-playing></tb-spotify-playing>' : `<div>${icon}</div>`}

      <div class="say-hi">
        Say "hi" on
        <a rel="me" href="https://indieweb.social/@tbeseda">Mastodon</a>
      </div>
    </footer>

    <server-timings sep=": " top="3" exclude="cdn-*,enhance-*"></server-timings>
  `
}
