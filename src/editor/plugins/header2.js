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
      icon: `<svg width="13.17676" height="13.8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.17676 13.8">
        <path
          d="M7.58921,8.15h-5.35v4.525a1.125,1.125,0,0,1-2.25,0h0V1.125a1.125,1.125,0,0,1,2.25,0V5.9h5.35V1.125a1.125,1.125,0,0,1,2.25,0v11.55a1.125,1.125,0,0,1-2.25,0Z"
          transform="translate(0.01079 0)" />
        <path
          d="M12.8105.42822a1.05233,1.05233,0,0,1,.34961.8208,1.31157,1.31157,0,0,1-.37012.895,4.89812,4.89812,0,0,1-.78418.60889,1.89484,1.89484,0,0,0-.7041.667H13.166v.54541H10.52925a1.45714,1.45714,0,0,1,.375-1.00586,5.124,5.124,0,0,1,.86914-.69385,3.49826,3.49826,0,0,0,.51855-.42334.89576.89576,0,0,0,.249-.59863A.61034.61034,0,0,0,12.37691.7832a.71162.71162,0,0,0-.49219-.14844A.60791.60791,0,0,0,11.3603.873a1.144,1.144,0,0,0-.19043.67236h-.62012A1.45542,1.45542,0,0,1,10.92085.52393a1.26363,1.26363,0,0,1,.98438-.41309A1.31357,1.31357,0,0,1,12.8105.42822Z"
          transform="translate(0.01079 0)" />
      </svg>`,
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
