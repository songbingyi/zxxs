let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');

/** @name 02-会员-微信登录-换取token */
const loginWithWechat = (para,callback) => {
  BaseHttp.post(API.loginWithWechat, para, (d, status) => {
    if (status) callback(d);
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}

/** @name 03-会员-获取会员授权信息 */
const getMemberAuthInfo = (callback) => {
  var para = {
    member_id: util.storageMethod.get('member_id')
  }
  BaseHttp.post(API.getMemberAuthInfo, para, (d, status) => {
    if (status) callback(d);
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}


/** @name 04-会员-记录登录状态-获取token-token获取token */
const loginWithToken = (para) => {
  BaseHttp.post(API.loginWithToken, para, (d, status) => {

    if (status) {//如果status为真，把新的token和id存入缓存
      wx.setStorageSync('token', d.token);
      wx.setStorageSync('member_id', d.member_id);
    }
    else { wechatLogin() }//如果status为假，发起wechatLogin重新登录
  });
}


/** @name 05-会员-获取会员详情- */
const getMemberDetail = (callback) => {
  var para = {
    member_id: util.storageMethod.get('member_id')
  }
  BaseHttp.post(API.getMemberDetail, para, (d, status) => {
    if (status) callback(d);
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}


module.exports = {
  loginWithWechat: loginWithWechat,
  getMemberAuthInfo: getMemberAuthInfo,
  loginWithToken: loginWithToken,
  getMemberDetail: getMemberDetail
}