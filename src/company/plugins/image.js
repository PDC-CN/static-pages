import wrapper from './wrapper';

function render(data) {
  const { file, caption, withBorder, stretched, withBackground } = data;
  const classnames = [];
  if (withBorder) {
    classnames.push('image-tool--withBorder');
  }
  if (stretched) {
    classnames.push('image-tool--stretched');
  }
  if (withBackground) {
    classnames.push('image-tool--withBackground');
  }

  return `<div class="cdx-block image-tool image-tool--filled ${classnames.join(' ')}">
    <div class="image-tool__image">
      <img class="image-tool__image-picture" src="${file.url}">
    </div>
    <div class="cdx-input image-tool__caption">${caption}</div>
  </div>`;
}

export default wrapper(render);
