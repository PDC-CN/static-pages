import wrapper from './wrapper';

function render(data) {
  const { items } = data;
  const htmls = items.map(item => `<div class="cdx-checklist__item ${item.checked ? 'cdx-checklist__item--checked' : ''}"><span class="cdx-checklist__item-checkbox"></span>
    <div class="cdx-checklist__item-text" contenteditable="true">${item.text}</div>
  </div>`);
  return `<div class="cdx-block cdx-checklist">${htmls.reduce((a, b) => a + b, '')}</div>`;
}

export default wrapper(render);
