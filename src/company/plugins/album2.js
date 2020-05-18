import wrapper from './wrapper';

const { $ } = window;

function repeat(count, str) {
  let ret = '';
  for (let i = 0; i < count; i += 1) {
    ret += str;
  }
  return ret;
}

function render(data) {
  const { count, images } = data;
  const $album = $(`<div class="ce-album with-title" data-cols="${data.count}">
    ${repeat(count, '<a></a>')}
  </div>`);
  images.forEach((image, i) => {
    const { url, link, title, desc } = image;
    const $n = $($album.children()[i]);
    $n.empty();
    $n.removeAttr('href');
    if (url && url.length > 0) {
      $n.empty().append(`<div class="img" style="background-image: url(${url})"></div>`);
      if (link && link.length > 0) {
        $n.attr('href', link);
      }
      if (title && title.length > 0) {
        $n.append(`<div class="title">${title}</div>`);
      }
      if (desc && desc.length > 0) {
        $n.append(`<div class="desc">${desc}</div>`);
      }
    }
  });
  return $album[0].outerHTML;
}

export default wrapper(render);
