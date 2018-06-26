let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');
let wechatLogin = require('../utils/wx.login.js');

/** @name 会员-获取token */
const loginWithToken = (para) => {
  BaseHttp.post(API.loginWithToken, para, (d, status) => {
    console.log(d,status)

    if (status) {
      wx.setStorageSync('token', d.token);
      wx.setStorageSync('member_id', d.member_id);}
    else { wechatLogin()}
  });
}
module.exports = {
  loginWithToken: loginWithToken
}