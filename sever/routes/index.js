const router = require('koa-router')()
const koaRequest = require('koa2-request');
const encodeUrl = require('encodeurl');
const urllib = require('urllib');
//文件下载
const fs = require("fs");
const path = require("path");
const send = require('koa-send');
const download = require('download');


router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

// 解析视频链接
router.post('/analyse', async (ctx, next) => {
  let initPath = ctx.request.body.path
  let re = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
  let pathtemp = initPath.match(re);
  initPath = pathtemp
  let appid = 'zJO1u3iJeSPMldia'
  let appsecret = 'PVScwnfBSNw78azD'
  //koa封装的请求第三方接口的方法(koa2-request)
  let res = await koaRequest({
    url: `https://api-sv.videoparse.cn/api/video/miniParse?appid=${appid}&appsecret=${appsecret}&url=${initPath}`,
    method: 'get',
  })
  ctx.body = JSON.parse(res.body)
  console.log(ctx.body)
  console.log(ctx.request.body)
  await next()
})

// 下载视频接口
router.post('/download', async (ctx, next) => {
  let analysePath = ctx.request.body.path
  let downloadContent = await download(analysePath)
  // 创建一个可写流
  var writerStream = fs.createWriteStream(path.join(__dirname, '../downloadSource/source.mp4'));
  // 使用 utf8 编码写入数据
  writerStream.write(downloadContent,'UTF8');
  // 标记文件末尾
  writerStream.end();

  // 处理流事件 --> finish、error
  writerStream.on('finish', function () {
    console.log("写入完成。");
  });

  writerStream.on('error', function (err) {
    console.log(err.stack);
  });
  console.log("程序执行完毕");
  let fileName='source.mp4';
  ctx.attachment(fileName);
  await send(ctx, fileName, { root:path.join(__dirname, '../downloadSource/')});
})

// 下载图片接口
router.post('/img', async (ctx, next) => {
  let analyseImgPath = ctx.request.body.imgPath
  let downloadContent = await download(analyseImgPath)
  // 创建一个可写流
  let writerImgStream = fs.createWriteStream(path.join(__dirname, '../downloadSource/sourceimg.jpg'));
  // 使用 utf8 编码写入数据
  writerImgStream.write(downloadContent,'UTF8');
  // 标记文件末尾
  writerImgStream.end();

  // 处理流事件 --> finish、error
  writerImgStream.on('finish', function () {
    console.log("图片写入完成。");
  });

  writerImgStream.on('error', function (err) {
    console.log(err.stack);
  });
  console.log("程序执行完毕");
  let fileName='sourceimg.jpg';
  ctx.attachment(fileName);
  await send(ctx, fileName, { root:path.join(__dirname, '../downloadSource/')});
})

module.exports = router