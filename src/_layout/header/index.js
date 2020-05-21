const { $ } = window;

$(() => {
  const $menu = $('header.main-header .b2 .menu');

  $('header.main-header .header-menu-btn').click((e) => {
    const $btn = $(e.currentTarget);
    if ($btn.hasClass('active')) {
      $btn.removeClass('active');
      $menu.removeClass('active');
    } else {
      $btn.addClass('active');
      $menu.addClass('active');
    }
  });
});
