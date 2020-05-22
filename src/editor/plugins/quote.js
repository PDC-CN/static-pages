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
  text: '',
};

class Quote {
  static get toolbox() {
    return {
      title: 'Quote',
      icon: '<svg width="15" height="14" viewBox="0 0 15 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.53 6.185l.027.025a1.109 1.109 0 0 1 0 1.568l-5.644 5.644a1.109 1.109 0 1 1-1.569-1.568l4.838-4.837L6.396 2.23A1.125 1.125 0 1 1 7.986.64l5.52 5.518.025.027zm-5.815 0l.026.025a1.109 1.109 0 0 1 0 1.568l-5.644 5.644a1.109 1.109 0 1 1-1.568-1.568l4.837-4.837L.58 2.23A1.125 1.125 0 0 1 2.171.64L7.69 6.158l.025.027z"></path></svg>',
    };
  }

  constructor({ data }) {
    this.data = {
      ...defaultData,
      ...data,
    };
  }

  render() {
    const { data } = this;
    const $wrapper = createElement('div', ['ce-quote-container']);
    const $editor = $(`<div class="ce-quote-content" contenteditable="true">${data.text}</div>`);
    this.$editor = $editor;
    $wrapper.appendChild($editor[0]);
    return $wrapper;
  }

  _getData() {
    const text = this.$editor.html();
    const ret = {
      ...defaultData,
      text,
    };

    return ret;
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

export default Quote;
