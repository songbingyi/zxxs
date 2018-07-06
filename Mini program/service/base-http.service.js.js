let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');

/** @name 09-基本-获取仓库分类列表 */
const getWarehouseCategoryList = (callback) => {
  var para = '父类ID';
  BaseHttp.post(API.getWarehouseCategoryList, para, (d, status) => {
    if (status) callback(d);
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}
/** @name 10-基本-获取支付方式列表 */
const getPaymentCodeList = (callback) => {
  var para = '父类ID';
  BaseHttp.post(API.getPaymentCodeList, para, (d, status) => {
    if (status) callback(d);
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}

/** @name 15-基本-获取订单状态列表 */
const getProductOrderStatusList = (callback) => {
  var para = '父类ID';
  BaseHttp.post(API.getProductOrderStatusList, para, (d, status) => {
    if (status) callback(d);
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}