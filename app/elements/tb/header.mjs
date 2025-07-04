/** @type {import('@enhance/types').EnhanceElemFn} */
export default function TbHeader({ html }) {
  return html`
<style>
  header {
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hinge {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  img {
    border-radius: 50%;
    box-shadow: var(--pico-card-box-shadow);
  }
  h1 {
    margin: 0;
  }
  @media (max-width: 820px) {
    header {
      padding: 1rem 1rem 0;
      flex-direction: column;
    }
  }

  /* -------------------------------------------------
    * Generated by BabyBird CSS on 2023-11-25 20:04:44
    * Web address : http://babybird.pages.dev
    * ------------------------------------------------- */
  .hinge:hover > a > img {
    transform-origin: top left;
    animation: 2s ease 0s 1 normal both running hinge-animation;
  }

  @keyframes hinge-animation {
    0% {
      animation-timing-function: ease-in-out;
    }

    20% {
      transform: rotate(70deg);
      animation-timing-function: ease-in-out;
    }

    40% {
      transform: rotate(45deg);
      animation-timing-function: ease-in-out;
      opacity: 1;
    }

    60% {
      transform: rotate(60deg);
      animation-timing-function: ease-in-out;
    }

    80% {
      transform: rotate(55deg);
      animation-timing-function: ease-in-out;
      opacity: 1;
    }

    100% {
      transform: translate3d(0, 800px, 0);
      opacity: 0;
    }
  }

  .flip-in {
    backface-visibility: visible;
    transform-origin: center bottom;
    animation: 1s ease 0s 1 normal both running flip-in-animation;
  }

  @keyframes flip-in-animation {
    0% {
      transform: perspective(400px) rotateX(90deg);
      animation-timing-function: ease-in;
      opacity: 0;
    }

    40% {
      transform: perspective(400px) rotateX(-20deg);
      animation-timing-function: ease-in;
    }

    60% {
      transform: perspective(400px) rotateX(10deg);
      opacity: 1;
    }

    80% {
      transform: perspective(400px) rotateX(-5deg);
    }

    100% {
      transform: perspective(400px);
    }
  }
</style>

<header>
  <div class="hinge">
    <a href="/">
      <img height="64px" width="64px" src="/_public/me.jpg">
    </a>
    <h1>
      <a class="contrast" href="/">Taylor Beseda</a>
    </h1>
  </div>

  <nav>
    <li><a href="/">home</a></li>
    <li>
      <a href="/blog">/blog</a>
      <a href="/blog/rss">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16" width="16">
          <path fill="currentColor" d="M 4 4.44 v 2.83 c 7.03 0 12.73 5.7 12.73 12.73 h 2.83 c 0 -8.59 -6.97 -15.56 -15.56 -15.56 Z m 0 5.66 v 2.83 c 3.9 0 7.07 3.17 7.07 7.07 h 2.83 c 0 -5.47 -4.43 -9.9 -9.9 -9.9 Z M 6.18 15.64 A 2.18 2.18 0 0 1 6.18 20 A 2.18 2.18 0 0 1 6.18 15.64"></path>
        </svg>
      </a>
    </li>
    <!-- <li><a href="/experiments">/experiments</a></li> -->
    <li><a href="/about">/about</a></li>
    <!--<a href="/knowledge">/knowledge</a>-->
  </nav>
</header>

<script type="module">
  class TbHeader extends HTMLElement {
    constructor () {
      super()
      this.$me = this.querySelector('div.hinge a img')
      this.$title = this.querySelector('div.hinge')
    }

    connectedCallback () {
      this.$title.addEventListener('mouseover', () => {
        this.$me.classList.add('flip-in')
      })
    }
  }
  customElements.define('tb-header', TbHeader)
</script>`
}
