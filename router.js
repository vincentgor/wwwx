'use strict';

const fs = require('fs');
const path = require('path');

const Router = require('koa-router');

const utils = require('./utils');

module.exports = function (router) {

    let routesDir = path.join(__dirname, 'src/routes');
    fs
        .readdirSync(routesDir)
        .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file !== 'index.js');
        })
        .forEach(function (file) {
            let fileName = utils.getFileNameFromFileStr(file);
            let subRouter = new Router();
            let routerModule = path.join(routesDir, file);
            require(routerModule)(subRouter);
            router.use('/api/v1/' + fileName.toLowerCase(), subRouter.routes(), subRouter.allowedMethods());
        });

};




