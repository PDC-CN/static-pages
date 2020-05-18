import wrapper from './wrapper';

function render(data) {
  const { header, sub } = data;
  return `<div class="ce-header-with-sub">
    <h1 class="ce-header t1">${header}</h1>
    <div class="ce-header ce-header-sub t2">${sub}</div>
  </div>`;
}

export default wrapper(render);
