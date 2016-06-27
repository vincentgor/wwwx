/*!
 * Created by vinxent on 2016/6/27.
 */

'use strict';

const Promise = require('bluebird');
const Request = require('request');

const requestGet = Promise.promisify(Request.get);
const requestPost = Promise.promisify(Request.post);

module.exports = function (router) {

    // 验证登录
    router.get('/login', function* (next) {
        if (!this.session.code) {
            this.body = {
                code: 1,
                url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx645b499c4950a4c3&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
            };
            return;
        } else {
            this.body = {
                code: 0,
                msg: '已经登陆'
            }
        }
    });

    // 回调（请求参数 code， 进而获取 access_token）
    router.get('/accesstoken', function* (next) {
        let code = this.query.code;
        var url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx645b499c4950a4c3&secret=8ed61397d934d4af3bcb4419acf3e83c&code=`+ code + `&grant_type=authorization_code`;
        console.log('url', url);
        let result = yield requestGet(url).then((result) => {
            console.log(result.body);
            return result;
        });
        this.body = result.body;
    });

};
