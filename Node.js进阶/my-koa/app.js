const Koa = require('./koa')

const app = new Koa()

app.use((req, res) => {
    res.writeHead(200)
    res.end('hello Koa')
})

app.listen(3000, () => {
    console.log('Server is running on 3000')
})