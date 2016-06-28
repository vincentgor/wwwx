/*!
 * Created by vinxent on 2016/6/24.
 */

'use strict';

console;    // 其实我也不知道为何要这么些，但是不这么做的话，在debug模式下，我的ide不干了

const path = require('path');

const koa = require('koa');
const router = require('koa-router')();
const koa_static = require('koa-static');
const cors = require('koa-cors');
const log4js = require('koa-log4js');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');

//const models = require('./src/models');
const notFound = require('./src/middleware/notFound');

const PORT = normalizePort(process.env.PORT || '8080');

const app = koa();

app.use(bodyParser());

app.keys = ['koala'];
app.use(session(app));

app.use(koa_static(path.join(__dirname, 'bower_components')));
app.use(koa_static(path.join(__dirname, 'public')));   // 这里最好不要直接写'public'，可能会有路径错误
app.use(cors({
    credentials: true
}));
app.use(log4js());
//app.use(log4js.koaLogger(log4js.getLogger("http"), { level: 'auto' }));

app.use(router.routes());
app.use(router.allowedMethods());

/**
 * 分发路由
 */
require('./router')(router);

/**
 * 404
 */
app.use(notFound.dealWith);

/**
 * 数据库初始化
 */
//models.sequelize.sync().then(function () {
console.log('数据库构建完成');
if (!module.parent) {
    app.listen(PORT, function () {
        console.log('server is listening', PORT);
    });
    app.on('error', onError);
}
//});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}



