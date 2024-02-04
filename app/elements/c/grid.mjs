/** @type {import('@enhance/types').EnhanceElemFn} */
export default function Grid ({ html, state: { attrs } }) {
  const { cols, rows } = attrs
  const colDgits = cols?.split('_')
  const rowDgits = rows?.split('_')
  let style = ''

  if (cols) {
    style += `grid-template-columns: ${colDgits
      .map((digit) => `${digit}fr`)
      .join(' ')}; `
  }

  if (rows) {
    style += `grid-template-rows: ${rowDgits
      .map((digit) => `${digit}fr`)
      .join(' ')};`
  }

  return html`
    <style>
      :host {
        display: block;
        padding: 0;
        margin-block: 0;
      }
      :host > div {
        display: grid;
        gap: 1.5rem;
      }
      :host > div > * {
        display: block;
        background: var(--background-secondary);
      }
    </style>

    <div style="${style}">
      <slot></slot>
    </div>
  `
}
