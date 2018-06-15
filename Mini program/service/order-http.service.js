let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');

/** @name 会员-获取个人信息详情 */
const getMemberDetail = (callback) => {
  BaseHttp.post(API.getTestInfo, {}, (d, status) => {
    if (status) callback(d);
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}

module.exports = {

  getMemberDetail: getMemberDetail
}