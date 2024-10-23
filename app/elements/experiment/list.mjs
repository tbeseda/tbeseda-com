import { Collection } from 'waylon'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function List({ html, state: { store } }) {
  const { experiments = [] } = store
  const collection = new Collection(experiments)

  return html`
    <style>
      :host {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
      }
      @media screen and (max-width: 767px) {
        :host {
          grid-template-columns: 1fr;
        }
      }
      .experiment {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: 0.5rem;
      }
      .experiment.featured {
        border: 1px solid cornflowerblue;
      }
      .experiment h3 {
        margin-bottom: 0.5rem;
        display: flex;
        gap: 0.5rem;
        align-items: start;
      }
      .experiment h3 mark {
        font-size: 0.8rem;
        background-color: dodgerblue;
        color: white;
        padding: 0.25rem;
        border-radius: 0.25rem;
      }
    </style>

    ${collection.render(
      'div',
      (i) => i.attrs({ class: `experiment${i.i.isFeatured ? ' featured' : ''}` }),
      (item) => `
        <h3>
          ${item.link(`/experiments/${item.i.slug.current}`, item.i.title)}
          ${item.i.isWIP ? '<mark>WIP</mark>' : ''}
        </h3>
        <time>${item.i.publishedAt}</time>
        <p>${item.i.excerpt}</p>

      `,
    )}
  `
}
