import wrapper from './wrapper';

const { $ } = window;

function render(data) {
  const { code, width, height } = data;
  const $if = $(decodeURIComponent(code));
  if ($if.length > 0 && $if[0].tagName === 'IFRAME') {
    $if.removeAttr('height');
    $if.removeAttr('width');
    $if.css('width', width);
    $if.css('height', height);
    return `<div class="ce-video">
      <div class="ce-video-container">${$if[0].outerHTML}</div>
    </div>`;
  }
  return '';
}

export default wrapper(render);
