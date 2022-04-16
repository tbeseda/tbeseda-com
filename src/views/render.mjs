import enhance from '@enhance/ssr';
import elements from './elements.mjs';
import document from './document.mjs';

export default function render({ initialState, body = '' }) {
  const html = enhance({ elements, initialState });
  const doc = document({ body, initialState });
  return html`${doc}`;
}
