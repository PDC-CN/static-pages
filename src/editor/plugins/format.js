const { $ } = window;

let $setting;
function initSettingTool() {
  $setting = $('<div id="cdxFormat">1111</div>');
  $('body').append($setting);
}

function showSetting(el) {
  const offset = $(el).offset();
  $setting.css('top', offset.top);
  $setting.css('left', offset.left);
  console.log(offset);
}

function renderFormat(el) {
  console.log(el);
}


$(() => {
  initSettingTool();
  $('body').delegate('.cdx-format', 'mousedown', (e) => {
    showSetting(e.currentTarget);
  });
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
      mark: {
        class: Marker.CSS,
      },
    };
  }
}

export default Marker;
