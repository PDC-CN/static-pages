export default function render(data) {
  const { $ } = window;
  $('body').css('backgroundColor', data.pageBackground);
  $('#holder').css('color', data.textColor);
  $('#holder').css('maxWidth', `${data.maxContainerWidth}px`);
}
