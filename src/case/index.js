const { $ } = window;

const isMobile = window.innerWidth <= 600;

function showCaseDetail(dom) {
  const $dom = $(dom);
  const $detial = $('.carousel .detail').empty();
  const type = $dom.attr('data-type');
  const name = $dom.attr('data-name');

  $detial.attr('data-name', name);
  if (type === 'image') {
    const cover = $dom.attr('data-cover');
    $detial.append(`<div class="type-image" style="background-image: url(${cover})"></div>`);
  }
}

$(() => {
  $('.owl-container .case').each((i, dom) => {
    const $dom = $(dom);
    const cover = $dom.attr('data-cover');
    $dom.css('backgroundImage', `url(${cover})`);
  });
  $('.owl-container .case').click((e) => {
    $('.owl-container .case').removeClass('active');
    $(e.target).addClass('active');
    showCaseDetail(e.target);
  });
  $('.owl-container .case').first().click();

  $('.owl-carousel').owlCarousel({
    loop: false,
    margin: isMobile ? 10 : 15,
    nav: true,
    autoWidth: true,
    dots: false,
  });

  // 分离b2
  if (isMobile) {
    const $newb2 = $('<div class="b2"></div>');
    const $b2 = $('.b2').first();
    $('.page-title', $b2).first().appendTo($newb2);
    $('.company', $b2).appendTo($newb2);
    $newb2.prependTo($('.main'));
  }
});
