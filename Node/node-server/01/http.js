const fs = require('fs')
const http = require('http')

const server = http.createServer((req, res) => {
    // 显示一个首页
    const {url, method, headers} = req
    if (url === '/' && method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain;charset=utf-8'
                })
                res.end('500 服务器错误')
                return
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
        })
    } else if (url === 'user' && method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify([
            {name: 'terry'}
        ]))
    } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        fs.createReadStream('.' + url).pipe(res)
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        res.end('404，页面没有找到')
    }
})

server.listen(3030)