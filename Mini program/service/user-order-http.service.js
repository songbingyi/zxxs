let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');

/** @name 用户-订单-获取历史订单列表 */
const getUserOrderList = (callback) => {
    BaseHttp.post(API.getUserOrderList, {}, (d, status) => {
        if (status) callback(d);
        else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
    });
}

module.exports = {
    getUserOrderList: getUserOrderList
}