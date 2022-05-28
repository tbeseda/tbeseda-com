import enhance from '@enhance/ssr';
import importTransform from '@enhance/import-transform';
import map from './_bundles/map.mjs';
import elements from './elements.mjs';
import document from './document.mjs';

export default function render({ initialState, body = '' }) {
  const html = enhance({
    elements,
    initialState,
    scriptTransforms: [importTransform({ map })],
  });

  const doc = document({ body, initialState });

  return html`${doc}`;
}
