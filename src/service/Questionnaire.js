'use strict';

const Promise = require('bluebird');

//const exampleModel = require('./../models').Example;

function Questionnaire() {

}

Questionnaire.prototype.add = function () {
    return Promise.resolve({
        code: 0,
        message: '添加问卷成功'
    });
    // 这里增加一份问卷

};

module.exports = new Questionnaire();