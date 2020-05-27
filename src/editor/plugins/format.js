const { $ } = window;

let $setting;
let $mask;
function initSettingTool() {
  $setting = $(`<div id="cdxFormat">
    <div class="row">
      <div class="label">字体大小</div>
      <input class="input font-size" type="number" placeholder="数字，默认14">
    </div>
    <div class="row">
      <div class="label">颜色</div>
      <input class="input font-color" placeholder="RGB色值，如 #3AFF22">
    </div>
    <div class="row">
      <div class="label">底纹颜色</div>
      <input class="input font-bg" placeholder="RGB色值，如 #3AFF22">
    </div>
  </div>`);
  $mask = $('<div id="cdxFormatMask"></div>');
  $('body').append($setting);
  $('body').append($mask);
}

function updateSettingPostion(el) {
  const $el = $(el);
  const offset = $el.offset();
  $setting.css('top', offset.top - 6);
  $setting.css('left', offset.left);
}

function showSetting(el) {
  const $el = $(el);
  updateSettingPostion(el);
  $setting.css('display', 'block');
  $mask.css('display', 'block');

  const $fontSize = $('.font-size', $setting);
  $fontSize.val($el.attr('data-font-size'));
  $fontSize.change((e) => {
    const { value } = e.target;
    $el.css('fontSize', `${value}px`);
    $el.attr('data-font-size', value);
    updateSettingPostion(el);
  });

  const $fontColor = $('.font-color', $setting);
  $fontColor.val($el.attr('data-font-color'));
  $fontColor.change((e) => {
    const { value } = e.target;
    $el.css('color', value);
    $el.attr('data-font-color', value);
  });

  const $fontBg = $('.font-bg', $setting);
  $fontBg.val($el.attr('data-font-bg'));
  $fontBg.change((e) => {
    const { value } = e.target;
    $el.css('backgroundColor', value);
    $el.attr('data-font-bg', value);
  });
}

function hideSetting() {
  $setting.css('display', 'none');
  $mask.css('display', 'none');

  $('.font-size', $setting).unbind('change');
}

let x;
let y;
$(() => {
  initSettingTool();
  $('body').delegate('.cdx-format', 'mousedown', (e) => {
    x = e.pageX;
    y = e.pageY;
  });
  $('body').delegate('.cdx-format', 'mouseup', (e) => {
    if (!x || !y) return;
    if (Math.abs(x - e.pageX) < 3 && Math.abs(y - e.pageY) < 3) {
      showSetting(e.currentTarget);
    }
    x = undefined;
    y = undefined;
  });
  $mask.click(hideSetting);
});

// 组件

class Marker {
  static get CSS() {
    return 'cdx-format';
  }

  constructor({ api }) {
    this.api = api;
    this.button = null;
    this.tag = 'SPAN';

    /**
     * CSS classes
     */
    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };
  }

  static get isInline() {
    return true;
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.classList.add(this.iconClasses.base);
    this.button.innerHTML = this.toolboxIcon;

    return this.button;
  }

  surround(range) {
    if (!range) {
      return;
    }

    const termWrapper = this.api.selection.findParentTag(this.tag, Marker.CSS);

    /**
     * If start or end of selection is in the highlighted block
     */
    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  wrap(range) {
    const marker = document.createElement(this.tag);

    marker.classList.add(Marker.CSS);

    marker.appendChild(range.extractContents());
    range.insertNode(marker);

    this.api.selection.expandToTag(marker);

    showSetting(marker);
  }

  unwrap(termWrapper) {
    this.api.selection.expandToTag(termWrapper);

    const sel = window.getSelection();
    const range = sel.getRangeAt(0);

    const unwrappedContent = range.extractContents();

    termWrapper.parentNode.removeChild(termWrapper);

    range.insertNode(unwrappedContent);

    sel.removeAllRanges();
    sel.addRange(range);
  }

  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag, Marker.CSS);

    this.button.classList.toggle(this.iconClasses.active, !!termTag);
  }

  get toolboxIcon() {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="1 2 13 12" width="13" height="12"><path d="M8.367 9.633L10.7 10.98l-.624 1.135-.787-.025-.78 1.35H6.94l1.193-2.066-.407-.62.642-1.121zm.436-.763l2.899-5.061a1.278 1.278 0 011.746-.472c.617.355.835 1.138.492 1.76l-2.815 5.114-2.322-1.34zM2.62 11.644H5.39a.899.899 0 110 1.798H2.619a.899.899 0 010-1.798z"/></svg>';
  }

  static get sanitize() {
    return {
      span: {
        class: Marker.CSS,
        'data-font-size': true,
        'data-font-color': true,
        'data-font-bg': true,
      },
    };
  }
}

export default Marker;
