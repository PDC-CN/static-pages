import wrapper from './wrapper';

function render(data) {
  const { file, caption, withBorder, stretched, withBackground, link } = data;
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

  let thelink;
  if (link && link !== 'undefined') {
    thelink = decodeURIComponent(link);
  }

  return `<div class="cdx-block image-tool image-tool--filled ${classnames.join(' ')}">
    <div class="image-tool__image">
      ${thelink ? `<a href="${thelink}" target="_blank">` : ''}
      <img class="image-tool__image-picture" src="${file.url}">
      ${thelink ? '</a>' : ''}
    </div>
    <div class="cdx-input image-tool__caption">${caption}</div>
  </div>`;
}

export default wrapper(render);
