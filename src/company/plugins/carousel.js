import wrapper from './wrapper';

const { $ } = window;

const isMobile = window.innerWidth <= 600;

const defaultData = {
  images: [{
    url: '',
  }],
  background: '',
  size: 'cover',
  height: 400,
};

function showDetail(caze, $detial) {
  $detial.empty();
  const url = $('img', $(caze)).attr('src');
  $detial.append(`<img src="${url}" >`);
}

function render(data) {
  const useData = {
    ...defaultData,
    ...data,
  };

  const { images, size, background, height } = useData;
  const activeImages = images.filter(i => i.url);

  if (activeImages.length === 0) return '';

  const $carousel = $(`<div class="ce-carousel">
    <div class="detail"></div>
    <div class="ce-carousel-content">
      <div class="owl-container owl-carousel owl-theme"></div>
    </div>
  </div>`);

  const $content = $('.ce-carousel-content', $carousel);
  const $detial = $('.detail', $carousel);
  const $owl = $('.owl-carousel', $content);

  activeImages.forEach((image) => {
    const $case = $(`<div class="case"><img src="${image.url}"></div>`);
    $owl.append($case);
    $case.click((e) => {
      $('.case', $content).removeClass('active');
      $(e.currentTarget).addClass('active');
      showDetail(e.currentTarget, $detial);
    });
  });

  $('.case', $owl).first().click();

  $detial.attr('data-size', size);
  $detial.css('height', `${height || 400}px`);
  if (background) {
    $detial.css('backgroundColor', background);
  } else {
    $detial.css('backgroundColor', '');
  }

  return $carousel[0].outerHTML;
}

export default wrapper(render);

export function afterCarouselRender() {
  $('.ce-carousel').each((i, el) => {
    const $carousel = $(el);
    const $content = $('.ce-carousel-content', $carousel);
    const $detial = $('.detail', $carousel);
    const $owl = $('.owl-carousel', $content);

    $('.case', $carousel).click((e) => {
      $('.case', $content).removeClass('active');
      $(e.currentTarget).addClass('active');
      showDetail(e.currentTarget, $detial);
    });

    $owl.owlCarousel({
      loop: false,
      margin: isMobile ? 10 : 15,
      nav: true,
      autoWidth: true,
      dots: false,
    });
  });
}
