import wrapper from './wrapper';

function render(data) {
  const { text } = data;
  return `<div class="ce-paragraph cdx-block">${text}</div>`;
}

export default wrapper(render);
