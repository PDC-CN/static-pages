const { $ } = window;
const $content = $('.comment-block .content');

function getPage(page = 1) {
  const data = [{
    avatar: 'https://assets.zjzsxhy.com/upload/ed8d2b77-b9fd-4cb7-bcad-e357b750e0de.png',
    name: '用户名',
    time: '2018-01-01 13:28',
    text: '中新网5月2日电 国家卫生健康委新闻发言人、宣传司副司长米锋2日表示，据世卫组织最新通报，疫情已扩散到213个国家和地区，日新增确诊病例连续一个月超过6万例。',
  }, {
    avatar: 'https://assets.zjzsxhy.com/upload/ed8d2b77-b9fd-4cb7-bcad-e357b750e0de.png',
    name: '用户名',
    time: '2018-01-01 13:28',
    text: '中新网5月2日电 国家卫生健康委新闻发言人、宣传司副司长米锋2日表示，据世卫组织最新通报，疫情已扩散到213个国家和地区，日新增确诊病例连续一个月超过6万例。',
  }];

  $content.empty();
  data.forEach((item) => {
    const $dom = `<div class="comment">
      <div class="avatar" style="background-image: url(${item.avatar})"></div>
      <div class="text">
        <div class="name">${item.name}</div>
        <div class="time">${item.time}</div>
        <div class="text">${item.text}</div>
      </div>
    </div>`;
    $content.append($dom);
  });
}

function init() {
  getPage();
}

export default init;
