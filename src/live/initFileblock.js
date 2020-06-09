import { getI18n } from '../_common';

const { $ } = window;

const i18n = getI18n({
  en: {
    empty: 'No Attachment',
  },
  'zh-CN': {
    empty: '暂无附件',
  },
});

export default function init() {
  const $content = $('.file-block .content .simplebar-content');
  if ($content.children().length === 0) {
    // 增加提示
    $content.append(`<div class="empty">${i18n.empty}</div>`);
  }
}
