const { $ } = window;

$(() => {
  const $menu = $('header.main-header .b2 .menu');

  $('header.main-header .header-menu-btn').click((e) => {
    const $btn = $(e.currentTarget);
    console.log(1);
    if ($btn.hasClass('active')) {
      $btn.removeClass('active');
      $menu.removeClass('active');
    } else {
      $btn.addClass('active');
      $menu.addClass('active');
    }
  });

  // stiky
  const $header = $('header.main-header');
  $(document).scroll(() => {
    if (window.scrollY > 30 && !$header.hasClass('not-on-top')) {
      $header.addClass('not-on-top');
    }
    if (window.scrollY <= 30 && $header.hasClass('not-on-top')) {
      $header.removeClass('not-on-top');
    }
  });
});
