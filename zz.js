const net = require('net')
const { Server } = require('http')

const response = 
`HTTP/1.1 200 OK
Data: Tue, 30 Jun 2020 01:00:00 GMT
Content-Type: text/plain
Connection: Closed

Hello World
`

const server = net.createServer(socket => {
    socket.end(response)
})


server.listen(80, () => {
    console.log('serve is running 3000')
})