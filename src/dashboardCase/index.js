const { $ } = window;

$(() => {
  $('.row textarea').keyup((e) => {
    const v = e.target.value;
    $(e.target).parent().attr('data-count', `${v.length}/50`);
  });

  $('.row textarea').each((i, el) => {
    const v = el.value;
    $(el).parent().attr('data-count', `${v.length}/50`);
  });

  $('.images-container .img:not(.add)').each((i, el) => {
    const url = $(el).attr('data-url');
    $(el).css('backgroundImage', `url(${url})`);
  });
  $('.images-container .img:not(.add)').click((e) => {
    console.log($(e.target).attr('data-id'));
  });
});
