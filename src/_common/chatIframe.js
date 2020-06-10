const { $ } = window;

// 翻译iframe
function initChatIframe() {
  const $index = $('.contact-index-me');
  if ($index.length === 0) return;
  $index.appendTo('.fixed-opt');
}

export default initChatIframe;
