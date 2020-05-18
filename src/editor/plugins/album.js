function createElement(type, className = []) {
  const $d = document.createElement(type);
  className.forEach((c) => {
    $d.classList.add(c);
  });
  return $d;
}

function repeat(count, str) {
  let ret = '';
  for (let i = 0; i < count; i += 1) {
    ret += str;
  }
  return ret;
}

const { $ } = window;

class Album {
  static get toolbox() {
    return {
      title: 'Album',
      icon: '<svg width="10" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 14"><path d="M7.6 8.15H2.25v4.525a1.125 1.125 0 0 1-2.25 0V1.125a1.125 1.125 0 1 1 2.25 0V5.9H7.6V1.125a1.125 1.125 0 0 1 2.25 0v11.55a1.125 1.125 0 0 1-2.25 0V8.15z"/></svg>',
    };
  }

  constructor({ data }) {
    this.data = data.count ? data : {
      count: 2,
      images: [{
        url: '',
        link: '',
      }, {
        url: '',
        link: '',
      }],
    };
  }

  render() {
    const { data } = this;
    const $wrapper = createElement('div', ['ce-album-container']);
    const $editor = $(`<div class="ce-album-editor">
      <div class="desc">此配置部分不会出现在页面上</div>
      <div class="row">
        <div class="label">列数</div>
        <select class="input">
          <option value="2" ${data.count === 2 ? 'selected' : ''}>2</option>
          <option value="3" ${data.count === 3 ? 'selected' : ''}>3</option>
          <option value="4" ${data.count === 4 ? 'selected' : ''}>4</option>
          <option value="5" ${data.count === 5 ? 'selected' : ''}>5</option>
          <option value="6" ${data.count === 6 ? 'selected' : ''}>6</option>
        </select>
      </div>
      <div class="row">
        <div class="label">图片URL</div>
        <div class="links input">
          ${data.images.map(img => `<div class="row"><input class="url" type="text" placeholder="图片URL" value="${img.url}"><input type="text" class="link" placeholder="图片点击链接" value="${img.link}"></div>`).reduce((a, b) => a + b, '')}
        </div>
      </div>
    </div>`);
    const $album = $(`<div class="ce-album" data-cols="${data.count}">
      ${repeat(data.count, '<a></a>')}
    </div>`);
    this.$editor = $editor;
    this.$album = $album;
    $('select', $editor).change((e) => {
      const count = parseInt(e.target.value, 10);
      const $links = $('.links', $editor).children();
      if ($links.length > count) {
        $links.each((i, el) => {
          if (i >= count) $(el).remove();
        });
      } else if ($links.length < count) {
        const add = count - $links.length;
        for (let i = 0; i < add; i += 1) {
          $('.links', $editor).append('<div><input class="url" type="text" placeholder="图片URL"><input type="text" class="link" placeholder="图片点击链接"></div>');
        }
      }
      const $pics = $album.children();
      if ($pics.length > count) {
        $pics.each((i, el) => {
          if (i >= count) $(el).remove();
        });
      } else if ($pics.length < count) {
        const add = count - $pics.length;
        for (let i = 0; i < add; i += 1) {
          $album.append('<a></a>');
        }
      }
      $album.attr('data-cols', count);
    });
    $editor.delegate('input', 'change', () => {
      this._renderAlbum();
    });
    this._renderAlbum();
    $wrapper.appendChild($editor[0]);
    $wrapper.appendChild($album[0]);
    return $wrapper;
  }

  _getData() {
    const count = parseInt($('select', this.$editor).val(), 10);
    const images = [];
    $('.links>div', this.$editor).each((i, el) => {
      const url = $('input.url', $(el)).val();
      const link = $('input.link', $(el)).val();
      images.push({
        url,
        link,
      });
    });

    return {
      count,
      images,
    };
  }

  _renderAlbum() {
    const data = this._getData();
    const { images } = data;
    images.forEach((image, i) => {
      const { url, link } = image;
      const $n = $(this.$album.children()[i]);
      $n.empty();
      $n.removeAttr('href');
      if (url && url.length > 0) {
        $n.empty().append(`<div class="img" style="background-image: url(${url})"></div>`);
        if (link && link.length > 0) {
          $n.attr('href', link);
        }
      }
    });
  }

  save() {
    return this._getData();
  }

  // validate(savedData) {
  //   const { header } = savedData;
  //   if (!header || !header.length) {
  //     return false;
  //   }

  //   return true;
  // }
}

export default Album;
