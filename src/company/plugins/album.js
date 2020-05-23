import wrapper from './wrapper';

const { $ } = window;

function repeat(count, str) {
  let ret = '';
  for (let i = 0; i < count; i += 1) {
    ret += str;
  }
  return ret;
}

const defaultData = {
  background: '',
  size: 'cover',
};

function render(data) {
  const useData = {
    ...defaultData,
    ...data,
  };
  const { count, images, background, size } = useData;
  const $album = $(`<div class="ce-album" data-cols="${count}">
    ${repeat(count, '<a></a>')}
  </div>`);
  images.forEach((image, i) => {
    const { url, link } = image;
    const $n = $($album.children()[i]);
    $n.empty();
    $n.removeAttr('href');
    if (url && url.length > 0) {
      let css = `background-image: url(${url});`;
      if (background && background.length) {
        css += `background-color: ${background};`;
      }
      $n.empty().append(`<div class="img" style="${css}"></div>`);
      if (link && link.length > 0) {
        $n.attr('href', link);
      }
    }
  });
  if (size === 'contain') {
    $album.addClass('size-contain');
  }
  return $album[0].outerHTML;
}

export default wrapper(render);
