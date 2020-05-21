# Toastio Static Pages
This is the static pages front-end source code of project Toastio.

## Develop

```shell
$ npm run dev
```

## staging部署
1. 首先执行命令行（**记住本地代码也要提交**）
```shell
$ npm run deploy
$ npm run release
```
2. 将dist目录下的对应的html文件中的内容替换toastio项目中的`app/views`文件内容
*fastkyc页面在app/public目录下面，home页面在app/views/welcome目录下面*
3. 从develop分支checkout一个分支提交，提交代码
4. 执行`$ bundle exec cap staging deploy`，确定两次，大概4分钟部署完成。


## 线上部署
1. 首先执行命令行（**记住本地代码也要提交**）
```shell
$ npm run deploy
$ npm run release
```
2. 将dist目录下的对应的html文件中的内容替换toastio项目中的`app/views`文件内容
*fastkyc页面在app/public目录下面，home页面在app/views/welcome目录下面*
3. 从develop分支checkout一个分支提交，提交代码
4. 然后找晓孟合并分支并让老龚部署

## passportSignin调试

去`account-service`项目中，将js和css劫持。

## 移动端适配

* [x] layout-header 有HTML改动
* [x] layout-footer
* [x] home
* [x] livelist
* [x] search
* [x] request
* [x] live
* [x] week
* [x] company
* [x] companyList
* [x] signin
* [x] register
* [x] event
* [x] news 有HTML改动，.b1下的a元素，增加class="link"
* [x] newsDetail
* [x] case
* [ ] editor
* [ ] dashboardUser
* [ ] dashboardChangePassword
* [ ] dashboardCompany
* [ ] dashboardCaseList
* [ ] dashboardCase
