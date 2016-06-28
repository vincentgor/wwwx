/*!
 * Created by vinxent on 2016/6/27.
 */

'use strict';

const Promise = require('bluebird');
const Request = require('request');
const _ = require('lodash');
const config = require('config');

const wechatController = require('./../controllers/Wechat');

const requestGet = Promise.promisify(Request.get);

module.exports = function (router) {

    // 验证登录
    router.get('/login', wechatController.login);


    // 回调（请求参数 code， 进而获取 access_token）
    router.get('/accesstoken', wechatController.accessToken);

};
