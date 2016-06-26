'use strict';

const Promise = require('bluebird');

//const exampleModel = require('./../models').Example;

function Red() {

}

Red.prototype.aware = function () {
    return Promise.resolve({
        code: 0,
        message: '领取红包成功'
    });
};

module.exports = new Red();