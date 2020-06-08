const { $ } = window;
const $content = $('.comment-block .content');

const commentUrl = window.location.pathname + '/comments';

let i18n = {
  en: {
    success: 'Success',
  },
  'zh-CN': {
    success: '评论成功',
  },
};

i18n = i18n[$('html').attr('data-locale') || 'zh-CN'];

function addItem(item, me = false) {
  const $dom = `<div class="comment ${me === true ? 'me' : ''}">
    <div class="avatar" style="background-image: ${item.avatar ? `url(${item.avatar})` : 'linear-gradient(to bottom right, #00BCB3 0%, #3FB3E4 100%)'}"></div>
    <div class="text">
      <div class="name">${item.name}</div>
      <div class="time">${item.created_at}</div>
      <div class="text">${item.detail}</div>
    </div>
  </div>`;
  $content.prepend($dom);
}

function getPage(page = 1) {
  const url = commentUrl + '?page=' + page;
  $.ajax({
    url,
  }).done((data) => {
    if (page === 1) {
      $content.empty();
    }
    data.reverse();

    data.forEach(addItem);
  });
}

function initSubmit() {
  $('#submitComment button').click(() => {
    const text = $('#submitComment textarea').val();
    if (text.length === 0) return;
    $.ajax({
      url: commentUrl,
      method: 'POST',
      data: JSON.stringify({
        detail: text,
      }),
      dataType: 'json',
      contentType: 'application/json',
    }).done((data) => {
      if (data.detail) {
        addItem(data, true);
        alert(i18n.success);
        $([document.documentElement, document.body]).animate({
          scrollTop: $('.comment-block .comment').first().offset().top - 60,
        }, 500);
      }
    });
  });
  $('#submitComment textarea').keypress(() => {
    setInterval(() => {
      const text = $('#submitComment textarea').val();
      if (text.length === 0) {
        $('#submitComment button').attr('disabled', 'disabled');
      } else {
        $('#submitComment button').removeAttr('disabled');
      }
    }, 0);
  });
  $('#submitComment button').attr('disabled', 'disabled');
}

function init() {
  initSubmit();
  getPage();
}

export default init;
