/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbFooter ({ html, state: { store } }) {
  const { currentlyPlaying, icon = '' } = store
  return html`
    <style>
      :host {
        display: block;
        width: 100%;
        max-width: 66rem;
        margin: 0 auto;
        padding: 2rem 1rem 0;
        font-size: 0.9rem;
      }
      footer {
        margin-bottom: 0.5rem;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
      }
      footer > div.icon {
        text-align: center;
        font-size: 2rem;
      }
      footer > div.say-hi {
        text-align: right;
      }

      server-timings {
        display: block;
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

      @media (max-width: 600px) {
        footer {
          grid-template-columns: 1fr;
          grid-template-rows: auto auto auto;
          gap: 1.25rem;
        }
        footer > div,
        footer > div.say-hi {
          text-align: center;
        }
        footer > div.icon,
        footer > tb-spotify-playing {
          grid-row: 1;
        }
        footer > div.say-hi {
          grid-row: 2;
        }
        footer > div.copyright {
          grid-row: 3;
        }
      }
    </style>

    <footer>
      <div class="copyright">
        &copy; tbeseda ${new Date().getFullYear().toString()}.
      </div>

      ${
        currentlyPlaying?.item
          ? '<tb-spotify-playing></tb-spotify-playing>'
          : `<div class="icon">${icon}</div>`
      }

      <div class="say-hi">
        <span>Say "hi" on</span>
        <a rel="me" href="https://indieweb.social/@tbeseda">Mastodon</a>
      </div>
    </footer>

    <server-timings sep=": " top="3" exclude="cdn-*,elements,api,html,fingerprint"></server-timings>
  `
}
