/*!
 * Created by vinxent on 2016/5/26.
 */
 
'use strict';

const wechatService = require('./../service/Wechat');

function Wechat() {
    
}

// 登录授权
Wechat.prototype.login = function* (next) {
    let callback = this.query.callback;
    callback = callback || this.request.originalUrl;
    console.log('callback', callback);
    console.log('openid', this.session.openid);
    if (!this.session.openid) {
        
        let authorizeUrl = wechatService.getAuthorizeUrl('snsapi_userinfo', callback);
        
        this.body = {
            code: 1,
            url: authorizeUrl
        };
    } else {
        this.body = {
            code: 0,
            msg: '已经登陆'
        }
    }
};

// 获取 authorize 以及 openid
Wechat.prototype.accessToken = function* (next) {
    let code = this.query.code;
    let state = this.query.state;
    
    let accessTokenUrl = wechatService.getAccessTokenUrl(code);
    
    // 获取 accessToken 和 openid
    let accessToken = yield wechatService.getAccessToken(accessTokenUrl);
   
    let userinfo = yield wechatService.getUserinfo(accessToken.access_token, accessToken.openid);
    
    this.session.openid = accessToken.openid;
    // this.body = lalala;
    if (state) {
        this.redirect(state);
    } else {
        this.body = userinfo;
    }
};

module.exports = new Wechat();