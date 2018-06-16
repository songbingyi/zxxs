let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');

/** @name 结算-获取菜品信息 */
const getOrderInfo = (callback) => {
  BaseHttp.post(API.getOrderInfo, {}, (d, status) => {
    if (status) callback(d);
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}

module.exports = {
  getOrderInfo: getOrderInfo
}