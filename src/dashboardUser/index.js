const { $ } = window;

$(() => {
  $('.row textarea').keyup((e) => {
    const v = e.target.value;
    $(e.target).parent().attr('data-count', `${v.length}/50`);
  });
});
