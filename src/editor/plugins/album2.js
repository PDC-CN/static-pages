import Uploader from '../lib/uploader';
import ColorPicker from '../lib/colorPicker';
import getI18n from '../i18n';

const i18ng = getI18n().dic.g;
const i18n = getI18n().dic.album;

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

const defaultData = {
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
  background: '',
  size: 'cover',
};

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
    this.data = data.count ? {
      ...defaultData,
      ...data,
    } : defaultData;
  }

  render() {
    const { data } = this;
    const $wrapper = createElement('div', ['ce-album-container']);
    const $editor = $(`<div class="ce-album-editor with-title ce-hidden-content">
      <div class="desc">${i18ng.hiddenTip}</div>
      <div class="row">
        <div class="label">${i18n.col}</div>
        <select class="input v-count">
          <option value="2" ${data.count === 2 ? 'selected' : ''}>2</option>
          <option value="3" ${data.count === 3 ? 'selected' : ''}>3</option>
          <option value="4" ${data.count === 4 ? 'selected' : ''}>4</option>
          <option value="5" ${data.count === 5 ? 'selected' : ''}>5</option>
          <option value="6" ${data.count === 6 ? 'selected' : ''}>6</option>
        </select>
      </div>
      <div class="row">
        <div class="label">${i18n.style}</div>
        <div class="links input">
          ${data.images.map(img => `<div class="row-with-title">
            <div class="r1"><input type="text" class="link" placeholder="${i18n.link}" value="${img.link}"></div>
            <div class="r2"><input class="title" type="text" placeholder="${i18n.title}" value="${img.title}" ></div>
            <div class="r3"><textarea class="desc" rows="4" placeholder="${i18n.desc}">${img.desc}</textarea></div>
          </div>`).reduce((a, b) => a + b, '')}
        </div>
      </div>
      <div class="row">
        <div class="label">${i18n.style}</div>
        <select class="input v-size">
          <option value="cover" ${data.size === 'cover' ? 'selected' : ''}>${i18n.styleCover}</option>
          <option value="contain" ${data.size === 'contain' ? 'selected' : ''}>${i18n.styleContain}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">${i18n.bg}</div>
        <div class="input v-background"></div>
      </div>
    </div>`);
    $('.links .r1', $editor).each((i, row) => {
      const uploader = new Uploader(data.images[i].url);
      uploader.onChange(() => {
        this._renderAlbum();
      });
      uploader.prependTo(row);
    });
    const $album = $(`<div class="ce-album with-title" data-cols="${data.count}">
      ${repeat(data.count, '<a></a>')}
    </div>`);
    this.$editor = $editor;
    this.$album = $album;
    $('.v-count', $editor).change((e) => {
      const count = parseInt(e.target.value, 10);
      const $links = $('.links', $editor).children();
      if ($links.length > count) {
        $links.each((i, el) => {
          if (i >= count) $(el).remove();
        });
      } else if ($links.length < count) {
        const add = count - $links.length;
        for (let i = 0; i < add; i += 1) {
          const $row = $(`<div class="row-with-title">
            <div class="r1"><input type="text" class="link" placeholder="${i18n.link}"></div>
            <div class="r2"><input class="title" type="text" placeholder="${i18n.title}"></div>
            <div class="r3"><textarea class="desc" rows="4" placeholder="${i18n.desc}"></textarea></div>
          </div>`);
          const uploader = new Uploader();
          uploader.onChange(() => {
            this._renderAlbum();
          });
          uploader.prependTo($('.r1', $row));
          $('.links', $editor).append($row);
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
    $('.v-size', $editor).change(() => {
      this._renderAlbum();
    });
    $editor.delegate('input', 'change', () => {
      this._renderAlbum();
    });
    $editor.delegate('textarea', 'change', () => {
      this._renderAlbum();
    });
    // color
    new ColorPicker($('.v-background', $editor), {
      placeholder: i18n.bgTip,
      initialValue: data.background,
      onChange: this._renderAlbum.bind(this),
    });
    this._renderAlbum();
    $wrapper.appendChild($editor[0]);
    $wrapper.appendChild($album[0]);
    return $wrapper;
  }

  _getData() {
    const count = parseInt($('select', this.$editor).val(), 10);
    const size = $('.v-size', this.$editor).val();
    const background = $('.v-background', this.$editor).attr('data-value');
    const images = [];
    $('.links>div', this.$editor).each((i, el) => {
      const url = $('.inline-uploader', $(el)).attr('data-url');
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
      size,
      background,
    };
  }

  _renderAlbum() {
    const data = this._getData();
    const { images, size, background } = data;
    images.forEach((image, i) => {
      const { url, link, title, desc } = image;
      const $n = $(this.$album.children()[i]);
      $n.empty();
      $n.removeAttr('href');
      if (url && url.length > 0) {
        let css = `background-image: url(${url});`;
        if (background && background.length) {
          css += `background-color: ${background}`;
        }
        $n.empty().append(`<div class="img" style="${css}"></div>`);
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
    if (size === 'cover') {
      this.$album.removeClass('size-contain');
    } else if (size === 'contain') {
      this.$album.addClass('size-contain');
    }
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
