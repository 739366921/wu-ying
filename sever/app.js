const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaRequest = require('koa2-request')
const fs = require("fs");
const sslify = require('koa-sslify').default; //http强制HTTPS
const https = require('https'); //node内置https server
const serve = require('koa-static'); //koa 静态资源插件

const index = require('./routes/index')
const users = require('./routes/users')

const cors = require('koa2-cors');

app.use(sslify())

var options = {
    key: fs.readFileSync('./2_www.sheepboss.xyz.key'), //私钥文件路径
    cert: fs.readFileSync('./1_www.sheepboss.xyz_bundle.crt') //证书文件路径
};
https.createServer(options, app.callback()).listen(3021, () => {
    console.log(`server running https success at 3021`)
});

//使用koa2-cors处理跨域
app.use(
    cors({
        origin: function(ctx) { //设置允许来自指定域名请求
            return '*'; //允许所有域名访问
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

//设置端口
const port = process.env.port || 3020

//监听端口
app.listen(port, () => {
    console.log(`sever start on ${port}`)
})

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app