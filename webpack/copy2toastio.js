const fs = require('fs');
const path = require('path');

let json;
try {
  json = fs.readFileSync('.toastio.json');
} catch (e) {
  console.error('失败：请检查是否有 .toastio.json 文件');
}

json = JSON.parse(json.toString());

const { path: toastioPath } = json;

if (!toastioPath) {
  console.error('失败：为找到 toastio 项目地址');
  return;
}

if (!fs.existsSync(path.resolve(toastioPath, 'Gemfile'))) {
  console.error('失败：为找到 toastio 项目地址');
  return;
}

const map = {
  download: 'public/download',
  forgetPass: 'public/forget_pass',
  heliosproject: 'public/helios',
  home: 'app/views/welcome',
  login: 'public/signin',
  recomend: 'public/recomend',
  resetPass: 'public/reset_pass',
  signup: 'public/signup',
  twofactors: 'public/two_factors',
};

const dists = fs.readdirSync('./dist/html').map((html) => [html, ...html.split('_')]);

dists.forEach(([distfile, key, filename]) => {
  const filepath = map[key];
  if (filepath) {
    const target = path.resolve(toastioPath, filepath, filename);
    if (fs.existsSync(target)) {
      fs.writeFileSync(target, fs.readFileSync('./dist/html/' + distfile))
      console.log(key, filename);
      return
    }
    const nextFilename = filename.replace('-', '_');
    const nextTarget = path.resolve(toastioPath, filepath, nextFilename);
    if (fs.existsSync(nextTarget)) {
      fs.writeFileSync(nextTarget, fs.readFileSync('./dist/html/' + distfile))
      console.log(key, filename);
      return
    }
  }
});
