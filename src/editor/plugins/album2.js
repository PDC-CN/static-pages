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

class AlbumWithTitle {
  static get toolbox() {
    return {
      title: 'AlbumWithTitle',
      icon: `<svg width="16" height="13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 13">
        <path class="st0" d="M1.4,9h1.1C3.4,9,4,8.4,4,7.6V1.4C4,0.6,3.4,0,2.6,0H1.4C0.6,0,0,0.6,0,1.4l0,6.1C0,8.4,0.6,9,1.4,9z"/>
        <path class="st0" d="M7.4,9h1.1C9.4,9,10,8.4,10,7.6V1.4C10,0.6,9.4,0,8.6,0H7.4C6.6,0,6,0.6,6,1.4v6.1C6,8.4,6.6,9,7.4,9z"/>
        <path class="st0" d="M13.4,9h1.1C15.4,9,16,8.4,16,7.6V1.4C16,0.6,15.4,0,14.6,0h-1.1C12.6,0,12,0.6,12,1.4v6.1 C12,8.4,12.6,9,13.4,9z"/>
        <path class="st0" d="M13.4,13h1.1c0.8,0,1.4-0.6,1.4-1.4v0c0-0.8-0.6-1.4-1.4-1.4h-1.1c-0.8,0-1.4,0.6-1.4,1.4v0 C12,12.4,12.6,13,13.4,13z"/>
        <path class="st0" d="M7.4,13h1.1c0.8,0,1.4-0.6,1.4-1.4v0c0-0.8-0.6-1.4-1.4-1.4H7.4c-0.8,0-1.4,0.6-1.4,1.4v0 C6,12.4,6.6,13,7.4,13z"/>
        <path class="st0" d="M1.4,13h1.1C3.4,13,4,12.4,4,11.6v0c0-0.8-0.6-1.4-1.4-1.4H1.4c-0.8,0-1.4,0.6-1.4,1.4v0 C0,12.4,0.6,13,1.4,13z"/>
      </svg>`,
    };
  }

  constructor({ data }) {
    this.data = data.count ? data : {
      count: 2,
      images: [{
        url: '',
        link: '',
        title: '',
        desc: '',
      }, {
        url: '',
        link: '',
        title: '',
        desc: '',
      }],
    };
  }

  render() {
    const { data } = this;
    const $wrapper = createElement('div', ['ce-album-container']);
    const $editor = $(`<div class="ce-album-editor with-title ce-hidden-content">
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
          ${data.images.map(img => `<div class="row-with-title">
            <div class="r1"><input class="url" type="text" placeholder="图片URL" value="${img.url}"><input type="text" class="link" placeholder="图片点击链接" value="${img.link}"></div>
            <div class="r2"><input class="title" type="text" placeholder="图片标题" value="${img.title}" ></div>
            <div class="r3"><textarea class="desc" rows="4" placeholder="图片说明">${img.desc}</textarea></div>
          </div>`).reduce((a, b) => a + b, '')}
        </div>
      </div>
    </div>`);
    const $album = $(`<div class="ce-album with-title" data-cols="${data.count}">
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
          $('.links', $editor).append(`<div class="row-with-title">
          <div class="r1"><input class="url" type="text" placeholder="图片URL"><input type="text" class="link" placeholder="图片点击链接"></div>
          <div class="r2"><input class="title" type="text" placeholder="图片标题"></div>
          <div class="r3"><textarea class="desc" rows="4" placeholder="图片说明"></textarea></div>
        </div>`);
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
      const title = $('input.title', $(el)).val();
      const desc = $('textarea.desc', $(el)).val();
      images.push({
        url,
        link,
        title,
        desc,
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
      const { url, link, title, desc } = image;
      const $n = $(this.$album.children()[i]);
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

export default AlbumWithTitle;
