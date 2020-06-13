import { getI18n } from '../_common/index';

const i18n = getI18n({
  en: {
    1: 'The anchor is preparing, please play it later.',
    2: 'The anchor is preparing, please play it later.',
    3: 'Something wrong with the network, please play it later.',
    4: 'The current system environment does not support playing this video format, please change another browser and try to play.',
    5: 'The current system environment does not support playing this video format, please change another browser and try to play.',
    10: 'Do not use the player under the file protocol, it may cause the video to not play.',
    11: 'The usage parameters are incorrect, please check the calling code of the player.',
    12: 'Please fill in the video playback address.',
    13: 'The live broadcast is over, please come back later.',
    1001: 'The anchor is preparing, please play it later.',
    1002: 'The anchor is preparing, please play later.',
    2032: 'The anchor is preparing, please play it later.',
    2048: 'The anchor is preparing, please play it later.',
  },
  'zh-CN': {
    1: '主播正在准备中，请稍后播放。',
    2: '主播正在准备中，请稍后播放。',
    3: '网络开小差，请稍后播放。',
    4: '当前系统环境不支持播放该视频格式，请更换浏览器尝试播放。',
    5: '当前系统环境不支持播放该视频格式，请更换浏览器尝试播放。',
    10: '请勿在 file 协议下使用播放器，可能会导致视频无法播放。',
    11: '使用参数有误，请检查播放器调用代码。',
    12: '请填写视频播放地址。',
    13: '直播已结束，请稍后再来。',
    1001: '主播正在准备中，请稍后播放。',
    1002: '主播正在准备中，请稍后播放。',
    2032: '主播正在准备中，请稍后播放。',
    2048: '主播正在准备中，请稍后播放。',
  },
});

const { $ } = window;

export default function init() {
  const { LIVE_CONFIG, TcPlayer, LIVE_SOURCE, LIVE_SOURCE_URL } = window;
  if (LIVE_CONFIG && LIVE_CONFIG.m3u8 && LIVE_CONFIG.flv) {
    const $c = document.querySelector('.video-container');
    $c.id = 'tcp-c';
    let width = 840;
    let height = 473;

    if (window.innerWidth < 600) {
      width = window.innerWidth;
      height = width * 0.56309523;
    }

    window.TCP = new TcPlayer('tcp-c', {
      m3u8: LIVE_CONFIG.m3u8,
      flv: LIVE_CONFIG.flv, // 增加了一个 flv 的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
      autoplay: true, // iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
      poster: LIVE_CONFIG.poster,
      rtmp: LIVE_CONFIG.rtmp,
      width: parseInt(width, 10).toString(), // 视频的显示宽度，请尽量使用视频分辨率宽度
      height: parseInt(height, 10).toString(), // 视频的显示高度，请尽量使用视频分辨率高度
      wording: i18n,
    });
  }
  // console.log(LIVE_CONFIG, TcPlayer);
  // 视频类
  if (LIVE_SOURCE === 'video') {
    const $c = $('.video-block .video-container');
    $c.append(`<div class="iframe-holder">${LIVE_SOURCE_URL}</div>`);
    $('.vcp-player', $c).css('display', 'none');
  }
}
