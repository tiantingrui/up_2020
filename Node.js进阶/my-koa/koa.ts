const http = require('http')

class Koa {
    private middleware: middlewareFn = () => {};
    
    constructor() {}

    listen(port: number, cb: noop) {
        const server = http.createServer((req, res) => {
            this.middleware(req, res)
        })
        return server.listen(port, cb)
    }
    
    use(middlewareFn: middlewareFn) {
        this.middleware = this.middleware
        return this
    }
}