const Koa = require('Koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

app.use(async (ctx, next) => {
    console.log(`process ${ctx.request.method} ${ctx.request.url}`)
    await next()
})

// 首页
router.get('/', async (ctx, next) => {
    ctx.type = 'html',
    ctx.body = fs.createReadStream('./public/index.html')
})

// post 请求
router.post('/login', async (ctx, next) => {
    let name = ctx.request.body.name || ''
    let password = ctx.request.body.password || ''
    if (name === 'koa' && password === '123456') {
        ctx.response.body = `<h1> Welcome, ${name} </h1>`
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
})



app.use(bodyParser())
router.use(templateRouters.routes(), router.allowedMethods());
app.use(static(path.join(__dirname, './public')))

app.listen(3000)