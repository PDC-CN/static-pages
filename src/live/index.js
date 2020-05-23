import initListBlock from './initListBlock';
import initComment from './initComment';
import initLive from './initLive';

const { $ } = window;

$(() => {
  if ($('body').attr('id') !== 'live') return;
  initListBlock();
  initComment();
  initLive();
});
