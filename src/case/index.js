const { $ } = window;

function showCaseDetail(dom) {
  const $dom = $(dom);
  const $detial = $('.carousel .detail').empty();
  const type = $dom.attr('data-type');
  const name = $dom.attr('data-name');

  $detial.attr('data-name', name);
  if (type === 'image') {
    const cover = $dom.attr('data-cover');
    $detial.append(`<div class="type-image" style="background: url(${cover})"></div>`);
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
    margin: 20,
    nav: true,
    autoWidth: true,
    dots: false,
  });
});
