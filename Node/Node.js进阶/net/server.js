const net = require('net')

const port = 3000
const host = '127.0.0.1'

const server = net.createServer(socket => {
    console.log('server is connected')
})

server.listen(port, host, () => {
    console.log('server is running')
})
