'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const config = require('config');
const Request = require('request');

const requestGet = Promise.promisify(Request.get);

function Wechat() {

}

// 构造 authorizeUrl
Wechat.prototype.getAuthorizeUrl = function (scope, state) {
    let redirect_uri = encodeURIComponent(config.url + config.wechat.callback);
    let authorizeUrl = config.wechat.authorize;
    authorizeUrl = authorizeUrl.replace('<%= appid %>', config.wechat.appid);
    authorizeUrl = authorizeUrl.replace('<%= redirect_uri %>', redirect_uri);
    authorizeUrl = authorizeUrl.replace('<%= scope %>', scope);
    authorizeUrl = authorizeUrl.replace('<%= state %>', state);
    console.log('authorizeUrl', authorizeUrl);
    return authorizeUrl;
}

// 构造 accessTokenUrl
Wechat.prototype.getAccessTokenUrl = function (code) {
    let accessTokenUrl = config.wechat.access_token;
    accessTokenUrl = accessTokenUrl.replace('<%= appid %>', config.wechat.appid);
    accessTokenUrl = accessTokenUrl.replace('<%= secret %>', config.wechat.secret);
    accessTokenUrl = accessTokenUrl.replace('<%= code %>', code);
    console.log('accessTokenUrl', accessTokenUrl);
    return accessTokenUrl;
}

// 构造 userinfoUrl
Wechat.prototype.getUserinfoUrl = function (access_token, openid, options) {
    options = options || {};
    options.lang = options.lang || 'zh_CN';
    let userinfoUrl = config.wechat.userinfo;
    userinfoUrl = userinfoUrl.replace('<%= access_token %>', access_token);
    userinfoUrl = userinfoUrl.replace('<%= openid %>', openid);
    userinfoUrl = userinfoUrl.replace('<%= lang %>', options.lang);
    console.log('userinfoUrl', userinfoUrl);
    return userinfoUrl;
}

// 获取 accessToken 以及 openid
Wechat.prototype.getAccessToken = function (accessTokenUrl) {

    return requestGet(accessTokenUrl).then((result) => {
        console.log(result.body);
        return JSON.parse(result.body);
    });

};

// 获取用户详情
Wechat.prototype.getUserinfo = function (access_token, openid, options) {
    let userinfoUrl = this.getUserinfoUrl(access_token, openid, options);
    return requestGet(userinfoUrl).then((result) => {
        console.log(result.body);
        return JSON.parse(result.body);
    });
};

module.exports = new Wechat();