function createElement(type, className = []) {
  const $d = document.createElement(type);
  className.forEach((c) => {
    $d.classList.add(c);
  });
  return $d;
}

class HeaderWithSub {
  static get toolbox() {
    return {
      title: 'HeaderWithSub',
      icon: '<svg width="10" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 14"><path d="M7.6 8.15H2.25v4.525a1.125 1.125 0 0 1-2.25 0V1.125a1.125 1.125 0 1 1 2.25 0V5.9H7.6V1.125a1.125 1.125 0 0 1 2.25 0v11.55a1.125 1.125 0 0 1-2.25 0V8.15z"/></svg>',
    };
  }

  constructor({ data }) {
    this.data = data;
  }

  render() {
    const { data } = this;
    const $wrapper = createElement('div', ['ce-header-with-sub']);
    const $h1 = createElement('h1', ['ce-header', 't1']);
    $h1.contentEditable = true;
    if (data && data.header) {
      $h1.innerHTML = data.header;
    }
    const $h2 = createElement('div', ['ce-header', 'ce-header-sub', 't2']);
    $h2.contentEditable = true;
    if (data && data.sub) {
      $h2.innerHTML = data.sub;
    }

    $wrapper.appendChild($h1);
    $wrapper.appendChild($h2);
    return $wrapper;
  }

  save(blockContent) {
    const $h1 = blockContent.querySelector('.t1');
    const $h2 = blockContent.querySelector('.t2');
    return {
      header: $h1.innerHTML,
      sub: $h2.innerHTML,
    };
  }

  validate(savedData) {
    const { header } = savedData;
    if (!header || !header.length) {
      return false;
    }

    return true;
  }
}

export default HeaderWithSub;
