const Koa = require("Koa")
const router = require('./routes')
const mongoose = require('mongoose')
const apmMiddleware = require('./middlewares/apm');
const bodyParser = require('./middlewares/body-parser');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error-handler');
const corsConfig = require('./config/cors');


class App extends Koa {
    constructor(...params) {
        super(...params)
        // Trust proxy
        this.proxy = true

        this.servers = []
        // 连接mongoDB
        this._connectDB();
    }

    _connectDB() {
        mongoose.connect('mongodb://127.0.0.1:27017/template', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    _configureRoutes() {
        this.use(router.routes())
        this.use(router.allowedMethods())
    }

    _configureMiddlewares() {
        this.use(errorHandler());
        this.use(apmMiddleware());
        this.use(requestId());
        this.use(logging({
            logger,
            overrideSerializers: false
        }));
        this.use(
            bodyParser({
                enableTypes: ['json'],
                jsonLimit: '10mb'
            })
        );
        this.use(
            cors({
                origins: corsConfig.origins,
                allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
                allowHeaders: ['Content-Type', 'Authorization'],
                exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
            })
        );
    }
}

module.exports = App