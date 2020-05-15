import initListBlock from './initListBlock';
import initComment from './initComment';

const { $ } = window;

$(() => {
  if ($('body').attr('id') !== 'live') return;
  initListBlock();
  initComment();
});
