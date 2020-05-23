
export default function init() {
  const { LIVE_CONFIG, TcPlayer } = window;
  if (LIVE_CONFIG && LIVE_CONFIG.m3u8 && LIVE_CONFIG.flv) {
    const $c = document.querySelector('.video-container');
    $c.id = 'tcp-c';
    const player = new TcPlayer('tcp-c', {
      m3u8: LIVE_CONFIG.m3u8,
      flv: LIVE_CONFIG.flv, // 增加了一个 flv 的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
      autoplay: true, // iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
      poster: LIVE_CONFIG.poster,
      rtmp: LIVE_CONFIG.rtmp,
      width: '840', // 视频的显示宽度，请尽量使用视频分辨率宽度
      height: '473', // 视频的显示高度，请尽量使用视频分辨率高度
    });
  }
  // console.log(LIVE_CONFIG, TcPlayer);
}
