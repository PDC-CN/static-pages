import zh from './zh';
import en from './en';

const { $ } = window;
// TODO:
const locale = $('html').attr('data-locale');

let i18n = zh;

if (locale === 'en') {
  i18n = en;
}

function getI18n() {
  return i18n;
}

export default getI18n;
