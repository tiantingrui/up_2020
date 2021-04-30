const Koa = require('Koa')
const app = new Koa()

app.use((ctx, next) => {
    ctx.body = [{
        name: 'terry'
    }]
})

app.use((ctx, next) => {
    const router = {}
    router['/html'] = ctx => {
        ctx.type = 'text/html;charset=utf-8'
        ctx.body = `<b> hello ${ctx.body[0].name} </b>`
    }
    router[ctx.url](ctx)
})

app.listen(3040)