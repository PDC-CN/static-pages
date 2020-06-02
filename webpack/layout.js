var path = require('path');
var fs = require('fs');

var entry = {
  layout_header: './_layout/header/index',
  layout_footer: './_layout/footer/index',
};

var devEntry = [{
  template: './_layout/header/devTemplate/zh-cn.html',
  filename: '_header_zh-cn.html',
}, {
  template: './_layout/header/devTemplate/en.html',
  filename: '_header_en.html',
}, {
  template: './_layout/footer/devTemplate/zh-cn.html',
  filename: '_footer_zh-cn.html',
}, {
  template: './_layout/footer/devTemplate/en.html',
  filename: '_footer_en.html',
}]

var templateParameters = {
  LAYOUT: {
    META: fs.readFileSync(path.join(__dirname, '../src/_layout/meta.html')),
    HEADER: {
      en: fs.readFileSync(path.join(__dirname, '../src/_layout/header/templates/en.html')),
      'zh-cn': fs.readFileSync(path.join(__dirname, '../src/_layout/header/templates/zh-cn.html')),
    },
    FOOTER: {
      en: fs.readFileSync(path.join(__dirname, '../src/_layout/footer/templates/en.html')),
      'zh-cn': fs.readFileSync(path.join(__dirname, '../src/_layout/footer/templates/zh-cn.html')),
    },
  },
};

var pure = [{
  template: './_pure/companies_zh-cn.html',
  filename: 'static_companies_zh-cn.html',
}, {
  template: './_pure/companies_en.html',
  filename: 'static_companies_en.html',
}];

module.exports = {
  entry,
  devEntry,
  templateParameters,
  pure,
};
