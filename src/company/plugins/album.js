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
  const $album = $(`<div class="ce-album" data-cols="${data.count}">
    ${repeat(count, '<a></a>')}
  </div>`);
  images.forEach((image, i) => {
    const { url, link } = image;
    const $n = $($album.children()[i]);
    $n.empty();
    $n.removeAttr('href');
    if (url && url.length > 0) {
      $n.empty().append(`<div class="img" style="background-image: url(${url})"></div>`);
      if (link && link.length > 0) {
        $n.attr('href', link);
      }
    }
  });
  return $album[0].outerHTML;
}

export default wrapper(render);
