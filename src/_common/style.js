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

import '../_layout/header';

// 后台移动端
const { $ } = window;
function initDashboardMobile() {
  if (window.innerWidth > 600) return;
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
});
