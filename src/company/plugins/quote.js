import wrapper from './wrapper';

function render(data) {
  const { text } = data;
  return `<div class="ce-quote-container">
    <div class="ce-quote-content">${text}</div>
  </div>`;
}

export default wrapper(render);
