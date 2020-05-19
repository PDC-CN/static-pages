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
});
