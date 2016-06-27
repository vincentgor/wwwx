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
        if (!this.session.openid) {
            let url = encodeURIComponent('https://wwwx-vincent-gor.c9users.io/api/v1/wechat/accesstoken');
            console.log(url);
            this.body = {
                code: 1,
                url: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx645b499c4950a4c3&redirect_uri=` + url + `&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
            };
            return;
        } else {
            this.body = {
                code: 0,
                msg: '已经登陆'
            }
        }
    });

    let getFans = function(access_token, openid, lang ) {
        lang = lang || 'zh_CN';
        let url = 'https://api.weixin.qq.com/sns/userinfo?access_token={access_token}&openid={openid}&lang={lang}';
        url = url.replace('{access_token}', access_token);
        url = url.replace('{openid}', openid);
        url = url.replace('{lang}', lang);
        console.log('url', url);
        return requestGet(url).then((result) => {
            console.log(result.body);
            return result.body;
        });
    };

    // 回调（请求参数 code， 进而获取 access_token）
    router.get('/accesstoken', function* (next) {
        let code = this.query.code;
        var url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx645b499c4950a4c3&secret=8ed61397d934d4af3bcb4419acf3e83c&code=`+ code + `&grant_type=authorization_code`;
        console.log('url', url);
        let result = yield requestGet(url).then((result) => {
            
            return JSON.parse(result.body);
        });
        console.log('result', typeof result);
        let lalala = yield getFans(result.access_token, result.openid);
        this.session.openid = result.openid;
        this.body = lalala;
    });

};
