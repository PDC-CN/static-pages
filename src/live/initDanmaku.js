import Danmaku from 'danmaku/dist/esm/danmaku.dom.js';
import { isLogin } from '../_common';

const { $ } = window;

const danmakuUrl = window.location.pathname + '/barrages';

const history = {};

// 去除已记录的条目
// 获得时间戳
// 按照时间戳排序
// 获得相对时间戳
// 各个时间戳随机增量
// 减去首个时间戳
// 返回按时间戳播放
function processItems(data) {
  const filtered = data.filter(item => !history[item.id]);
  if (filtered.length === 0) return [];
  const formatted = filtered.map((item) => {
    const ret = {
      ...item,
      created_at: item.created_at.replace(/-/g, '/'),
    };
    ret.created_at_time = new Date(ret.created_at).getTime();
    return ret;
  });
  const sorted = formatted.sort((a, b) => (a.created_at_time > b.created_at_time ? 1 : -1));
  let start = sorted[0].created_at_time;
  const timed = sorted.map(item => ({
    ...item,
    diff: item.created_at_time - start + parseInt(Math.random() * 1000, 10),
  }));
  start = timed[0].diff;
  const timed2 = timed.map(item => ({
    ...item,
    diff: item.diff - start,
  }));
  return timed2;
}

function cleanHistory() {
  const now = new Date().getTime();
  const min3ago = now - 1000 * 60 * 3;
  Object.keys(history).forEach((id) => {
    if (history[id] < min3ago) {
      delete history[id];
    }
  });
}

/** 逻辑 */

let danmaku;
function initEngine() {
  const $holder = $('<div class="danmaku-holder"></div>');
  $('.video-block .video-container').append($holder);
  danmaku = new Danmaku({
    container: $holder[0],
  });
}

function addComment(item) {
  history[item.id] = new Date().getTime();
  $('.video-comment-block .simplebar-content').prepend(`<div class="comment"><span class="user">${item.name}：</span>${item.detail}</div>`);
}

function emitDanmaku(item, me) {
  const style = me ? {
    fontSize: '20px',
    color: '#ffffff',
    border: '1px solid #ffffff',
  } : {
    fontSize: '20px',
    color: '#ffffff',
  };

  danmaku.emit({
    text: item.detail,
    style,
  });

  addComment(item);
}

function queryDanmaku(init) {
  $.ajax({
    url: danmakuUrl + '?_=' + parseInt(new Date().getTime() / 5000, 10),
  }).done((data) => {
    if (data.length === 0) return;
    if (init) {
      data.forEach(addComment);
    }
    const processedData = processItems(data);
    processedData.forEach((item) => {
      setTimeout(() => {
        emitDanmaku(item);
      }, item.diff);
    });
  });
}

function submit() {
  if (!isLogin()) return;
  const $input = $('.video-block .video-comment .input input');
  const detail = $input.val();
  if (!detail) return;
  $.ajax({
    url: danmakuUrl,
    method: 'POST',
    data: JSON.stringify({
      detail,
    }),
    dataType: 'json',
    contentType: 'application/json',
  }).done((data) => {
    if (data.detail) {
      emitDanmaku(data, true);
    }
  });
}

export default function initDanmaku() {
  initEngine();
  const $submit = $('.video-block .video-comment .input button');
  if (!isLogin()) {
    $submit.attr('disabled', 'disabled');
  }
  queryDanmaku(true);
  setInterval(cleanHistory, 60000);
  setInterval(queryDanmaku, 5000);
  $submit.click(submit);

  $('.video-block .video-comment .switch').click((e) => {
    $(e.currentTarget).toggleClass('active');
    $('.video-block .danmaku-holder').toggleClass('hide');
  });
}
