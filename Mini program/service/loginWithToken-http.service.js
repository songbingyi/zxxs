let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');

/** @name 会员-获取token */
const loginWithToken = (para, callback) => {
  BaseHttp.post(API.loginWithToken, para, (d, status) => {
    if (status) callback(d);
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}
module.exports = {
  loginWithToken: loginWithToken
}