import wrapper from './wrapper';

function render(data) {
  const { text, level } = data;
  return `<h${level} class="ce-header">${text}</h${level}>`;
}

export default wrapper(render);
