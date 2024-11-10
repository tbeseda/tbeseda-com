/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbFooter({ html, state: { store } }) {
  const { currentlyPlaying, icon = '' } = store
  return html`
    <style>
      footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

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
        list-style: none;
        border-right: 1px solid #ccc;
        padding-right: 0.75rem;
      }
      server-timings li:last-child {
        border-right: none;
        padding-right: 0;
      }

      .bluesky-flutter {
        display: inline-flex;
        gap: 0.5em;
        align-items: center;
      }

      .bluesky-flutter svg {
        width: 1.25rem;
        height: 1.25rem;
        transition: 200ms;
      }

      .bluesky-flutter .left {
        transform-origin: center;
      }
      .bluesky-flutter .right {
        transform-origin: center;
        transform: scale(-1, 1);
      }
      .bluesky-flutter:hover .left,
      .bluesky-flutter:focus .left {
        animation: flutter 430ms ease-in-out;
        --flip: 1;
      }
      .bluesky-flutter:hover .right,
      .bluesky-flutter:focus .right {
        animation: flutter 500ms ease-in-out;
        --flip: -1;
      }
      .bluesky-flutter:hover svg,
      .bluesky-flutter:focus svg{
        transform: rotate(-5deg);
        transition: 500ms;
      }

      @media (prefers-reduced-motion) {
        .bluesky-flutter:hover .left,
        .bluesky-flutter:focus .left,
        .bluesky-flutter:hover .right,
        .bluesky-flutter:focus .right {
          animation: none;
        }
      }

      @keyframes flutter {
        10% {
          transform: scale(calc(var(--flip)*1), 0.9);
        }
        20% {
          transform: scale(calc(var(--flip)*0.5), 1)
        }
        40% {
          transform: scale(calc(var(--flip)*0.9), 0.95);
        }
        60% {
          transform: scale(calc(var(--flip)*0.3), 1);
        }
        80% {
          transform: scale(calc(var(--flip)*0.9), 0.95);
        }
        100% {
          transform: scale(calc(var(--flip)*1), 1);
        }
      }
    </style>

    <footer>
      <div>
        &copy; tbeseda ${new Date().getFullYear().toString()}.
      </div>

      ${currentlyPlaying?.item ? '<tb-spotify-playing></tb-spotify-playing>' : `<div>${icon}</div>`}

      <a href="https://bsky.app/profile/tbeseda.com" target="_blank" class="bluesky-flutter">

        <svg id="flutterby" class="bluesky-flutter" viewBox="0 0 566 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path id="wing" fill="currentColor" d="M 123.244 35.008 C 188.248 83.809 283.836 176.879 283.836 235.857 C 283.836 316.899 283.879 235.845 283.836 376.038 C 283.889 375.995 282.67 376.544 280.212 383.758 C 266.806 423.111 214.487 576.685 94.841 453.913 C 31.843 389.269 61.013 324.625 175.682 305.108 C 110.08 316.274 36.332 297.827 16.093 225.504 C 10.271 204.699 0.343 76.56 0.343 59.246 C 0.343 -27.451 76.342 -0.206 123.244 35.008 Z" />
          </defs>
          <use xlink:href="#wing" class="left" />
          <use xlink:href="#wing" class="right" />
        </svg>

        @tbeseda.com

      </a>

    </footer>

    <server-timings sep=": " top="3" exclude="cdn-*,enhance-*"></server-timings>
  `
}
