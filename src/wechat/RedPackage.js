/**
 * Created by vinxent on 2016/6/26.
 */

const Promise = require('bluebird');
const Request = require('request');

const xml2js = require('xml2js');
const builder = new xml2js.Builder({rootName: 'xml', headless: true});   //去掉xml格式说明
const ParseString = xml2js.parseString;

const requestGet = Promise.promisify(Request.get);
const requestPost = Promise.promisify(Request.post);
const parseString = Promise.promisify(ParseString);

//console.log(requestPost.toString());

// test
//requestGet('http://www.baidu.com').then((result) => {
//    console.log(result.body);
//});

// 必须的参数
let required = {
    nonce_str: 'nonce_str',
    sign: 'sign',
    mch_billno: 'mch_billno',
    mch_id: 'mch_id',
    wxappid: 'wxappid',
    send_name: 'send_name',
    re_openid: 're_openid',
    total_amount: 'total_amount',
    total_num: 'total_num',
    wishing: 'wishing',
    client_ip: 'client_ip',
    act_name: 'act_name',
    remark: 'remark'
};

// 可选参数
let options = {
    // 居然没有
};

let xml = builder.buildObject(required);
requestPost('https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack', {
//        json: true,
    body: xml
}).then((result) => {
    return parseString(result.body, {explicitArray: false, trim: true});
}).then((result) => {
    result = result.xml;
    if (result.return_code != 'SUCCESS') {
        console.log(result.return_msg);
        return Promise.reject(result.return_msg);
    }
    if (result.result_code == 'FAIL') {
        console.log('err_code', result.err_code);
        console.log('err_code_des', result.err_code_des);
        return Promise.reject(result.err_code_des);
    }
    console.log('err', result.return_msg);
    return result.return_msg;
}).catch((err) => {
    console.log('err', err);
});



