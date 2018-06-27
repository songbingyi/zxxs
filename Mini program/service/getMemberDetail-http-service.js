let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');

/** @name 会员-获取token */
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
  getMemberDetail: getMemberDetail
}