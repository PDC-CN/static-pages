import './style.scss';
import './style.dashboard.scss';
import '../_layout/header/style.scss';
import '../_layout/footer/style.scss';
import '../index/style.scss';
import '../livelist/style.scss';
import '../search/style.scss';
import '../request/style.scss';
import '../live/style.scss';
import '../week/style.scss';
import '../editor/style.scss';
import '../company/style.scss';
import '../companyList/style.scss';
import '../signin/style.scss';
import '../event/style.scss';
import '../news/style.scss';
import '../newsDetail/style.scss';
import '../case/style.scss';
import '../dashboardUser/style.scss';
import '../dashboardChangePassword/style.scss';
import '../dashboardCompany/style.scss';
import '../dashboardCaseList/style.scss';
import '../dashboardCase/style.scss';
import '../_pure/style.scss';

import '../_layout/header';

import initContactIframe from './contactIframe';
import initTransIframe from './translateIframe';
import initChatIframe from './chatIframe';

// 后台移动端
const { $ } = window;

window.LOCALE = $('html').attr('data-locale');

function initDashboardMobile() {
  if (window.innerWidth > 600) return;
  if (!$('body').hasClass('dashboard')) return;
  $('header.main-header .header-menu-btn').unbind('click');
  $('header.main-header .header-menu-btn').click((e) => {
    const $btn = $(e.currentTarget);
    if ($btn.hasClass('active')) {
      $btn.removeClass('active');
      $('.main>.menu').removeClass('active');
    } else {
      $btn.addClass('active');
      $('.main>.menu').addClass('active');
    }
  });
}

$(() => {
  initDashboardMobile();
  $('body').append('<div class="fixed-opt"></div>');
  initContactIframe();
  initTransIframe();
  initChatIframe();
  // 浮动广告
  $('.fixed-ad').append('<div class="close"></div>');
  $('.fixed-ad .close').click((e) => {
    $(e.currentTarget).parent().remove();
  });
  // 点击统计
  $('body').delegate('[data-track]', 'click', (e) => {
    const data = $(e.currentTarget).attr('data-track').split('|');
    if (window._hmt) {
      // console.log(['_trackEvent'].concat(data));
      window._hmt.push(['_trackEvent'].concat(data));
    }
  });
  // console.log(1);
});
