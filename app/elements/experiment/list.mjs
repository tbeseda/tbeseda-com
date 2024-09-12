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
        border: 1px solid navy;
      }
      .experiment h3 {
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: space-between;
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
      (i) => i.attrs({ class: `experiment${i.i.featured ? ' featured' : ''}` }),
      (item) => `
        <h3>
          ${item.link(item.i.url, item.i.name)}
          ${item.i.wip ? '<mark>WIP</mark>' : ''}
        </h3>
        <time>${item.i.date}</time>
        <p>${item.i.description}</p>
      `,
    )}
  `
}
