
const { $ } = window;

const tamplate = `<div id="contactIframe">
</div>`;

function createIframe(url) {
  console.log(url);
}

// 联系我们iframe
function initContactIframe() {
  const $contact = $('.contact-me');
  const url = $contact.attr('href');
  $contact.removeAttr('href');
  if ($contact.length === 0 || !url) return;

  $contact.click(() => {
    createIframe(url);
  });
}

export default initContactIframe;
