const { $ } = window;
const $grid = $('.list-block .grid');

function initLive(page = 1) {
  const data = [{
    cover: 'https://assets.zjzsxhy.com/upload/94bfa214-bc31-4ff5-86f5-a488ac9b6696.jpg',
    title: '视频标题',
    name: '用户名',
    time: '2019-01-01',
    link: '#',
  }, {
    cover: 'https://assets.zjzsxhy.com/upload/94bfa214-bc31-4ff5-86f5-a488ac9b6696.jpg',
    title: '视频标题',
    name: '用户名',
    time: '2019-01-01',
    link: '#',
  }, {
    cover: 'https://assets.zjzsxhy.com/upload/94bfa214-bc31-4ff5-86f5-a488ac9b6696.jpg',
    title: '视频标题',
    name: '用户名',
    time: '2019-01-01',
    link: '#',
  }, {
    cover: 'https://assets.zjzsxhy.com/upload/94bfa214-bc31-4ff5-86f5-a488ac9b6696.jpg',
    title: '视频标题',
    name: '用户名',
    time: '2019-01-01',
    link: '#',
  }, {
    cover: 'https://assets.zjzsxhy.com/upload/94bfa214-bc31-4ff5-86f5-a488ac9b6696.jpg',
    title: '视频标题',
    name: '用户名',
    time: '2019-01-01',
    link: '#',
  }];
  data.forEach((item) => {
    const $dom = `<a href="${item.link}" class="live">
      <div class="cover" style="background-image: url(${item.cover})"></div>
      <div class="title">${item.title}</div>
      <div class="info">
        <div class="name">${item.name}</div>
        <div class="time">${item.time}</div>
      </div>
    </a>`;
    $grid.append($dom);
  });
}

function initReplay(page = 1) {
  const data = [{
    cover: 'https://assets.zjzsxhy.com/upload/94bfa214-bc31-4ff5-86f5-a488ac9b6696.jpg',
    title: '视频标题',
    name: '用户名',
    time: '2019-01-01',
    link: '#',
  }, {
    cover: 'https://assets.zjzsxhy.com/upload/94bfa214-bc31-4ff5-86f5-a488ac9b6696.jpg',
    title: '视频标题',
    name: '用户名',
    time: '2019-01-01',
    link: '#',
  }];
  data.forEach((item) => {
    const $dom = `<a href="${item.link}" class="replay">
      <div class="cover" style="background-image: url(${item.cover})"></div>
      <div class="title">${item.title}</div>
      <div class="info">
        <div class="name">${item.name}</div>
        <div class="time">${item.time}</div>
      </div>
    </a>`;
    $grid.append($dom);
  });
}

function initProduct(page = 1) {
  const data = [{
    cover: 'https://assets.zjzsxhy.com/upload/94bfa214-bc31-4ff5-86f5-a488ac9b6696.jpg',
    title: '产品标题',
    desc: '中新网5月2日电 国家卫生健康委新闻发言人、宣传司副司长米锋2日表示，据世卫组织最新通报，疫情已扩散到213个国家和地区，日新增确诊病例连续一个月超过6万',
    link: '#',
  }, {
    cover: 'https://assets.zjzsxhy.com/upload/94bfa214-bc31-4ff5-86f5-a488ac9b6696.jpg',
    title: '产品标题',
    desc: '中新网5月2日电 国家卫生健康委新闻发言人、宣传司副司长米锋2日表示，据世卫组织最新通报，疫情已扩散到213个国家和地区，日新增确诊病例连续一个月超过6万',
    link: '#',
  }, {
    cover: 'https://assets.zjzsxhy.com/upload/94bfa214-bc31-4ff5-86f5-a488ac9b6696.jpg',
    title: '产品标题',
    desc: '中新网5月2日电 国家卫生健康委新闻发言人、宣传司副司长米锋2日表示，据世卫组织最新通报，疫情已扩散到213个国家和地区，日新增确诊病例连续一个月超过6万，日新增确诊病例连续一个月超过6万，日新增确诊病例连续一个月超过6万，日新增确诊病例连续一个月超过6万，日新增确诊病例连续一个月超过6万',
    link: '#',
  }];
  data.forEach((item) => {
    const $dom = `<a href="${item.link}" class="product">
      <div class="cover" style="background-image: url(${item.cover})"></div>
      <div class="title">${item.title}</div>
      <div class="desc">${item.desc}</div>
    </a>`;
    $grid.append($dom);
  });
}

function initGuest(page = 1) {
  const data = [{
    cover: 'https://assets.zjzsxhy.com/upload/94bfa214-bc31-4ff5-86f5-a488ac9b6696.jpg',
    name: '产品标题',
    desc: '国家主席',
    link: '#',
  }, {
    cover: 'https://assets.zjzsxhy.com/upload/94bfa214-bc31-4ff5-86f5-a488ac9b6696.jpg',
    name: '产品标题',
    desc: '国家主席',
    link: '#',
  }];
  data.forEach((item) => {
    const $dom = `<a href="${item.link}" class="guest">
      <div class="cover" style="background-image: url(${item.cover})"></div>
      <div class="name">${item.name}</div>
      <div class="desc">${item.desc}</div>
    </a>`;
    $grid.append($dom);
  });

}


function initTab(tab) {
  $grid.empty();
  if (tab === 'live') initLive();
  if (tab === 'replay') initReplay();
  if (tab === 'product') initProduct();
  if (tab === 'guest') initGuest();
}
function init() {
  $('.list-block .tabs .tab').click((e) => {
    const $this = $(e.target);
    if ($this.hasClass('active')) return;
    const tab = $this.attr('data-tab');
    $('.list-block .tabs .tab').removeClass('active');
    $this.addClass('active');
    initTab(tab);
  });
  initTab('live');
}

export default init;
