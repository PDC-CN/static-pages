var fs = require('fs');
var routers = require('./routers.deploy.json').routers;

var files = fs.readdirSync('./dist/static');

var reg = /.+\.html/;

fs.mkdirSync('./dist/html/');

files.forEach(function(file) {
  if (reg.test(file)) {
    fs.renameSync('./dist/static/' + file, './dist/html/' + file);
  }
})
