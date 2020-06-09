import { isLogin } from '../_common';

const { $ } = window;

export default function init() {
  if (!isLogin()) {
    $('.video-block .video-comment .input button').attr('disabled', 'disabled');
  }
}
