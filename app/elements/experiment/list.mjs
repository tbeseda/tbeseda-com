import { Collection } from 'waylon'

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function List({ html, state: { store } }) {
  const { experiments = [] } = store
  const collection = new Collection(experiments)

  return html`
    <style>
      :host {
        display: block;
      }
      .experiment {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: 0.5rem;
      }
      .experiment.featured {
        box-shadow: var(--shadow);
      }
      .experiment * {
        margin: 0;
        padding: 0;
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
      .experiment time {
        font-size: 0.8em;
        margin-bottom: 0.5rem;
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
