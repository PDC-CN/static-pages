const { $ } = window;

export default function format() {
  $('span.cdx-format').each((i, el) => {
    const $el = $(el);
    const fontSize = $el.attr('data-font-size');
    const fontColor = $el.attr('data-font-color');
    const bg = $el.attr('data-font-bg');
    if (fontSize) {
      $el.css('fontSize', `${fontSize}px`);
    }
    if (fontColor) {
      $el.css('color', fontColor);
    }
    if (bg) {
      $el.css('backgroundColor', bg);
    }
  });
}
