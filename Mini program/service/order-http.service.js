let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');

/** @name 11-订单-结算-获取仓库商品列表
 *  @function getWareHouseProductList(page |请求页数, callback|回调函数)
 */
const getWareHouseProductList = (page, callback) => {
  var para = {
    member_id: util.storageMethod.get('member_id'),
    member_order_id: '1',//订单编号
    pagination: {
      page: page,
      count: getApp().globalData.pageCount //10个数据
    }
  }
  BaseHttp.post(API.getWareHouseProductList, para, (d, status,p) => {//d:data,status:状态,p:分页信息
    if (status) {callback(d,p)}
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}




/** @name 结算-获取菜品信息 */
const getOrderInfo = (callback) => {
  BaseHttp.post(API.getOrderInfo, {}, (d, status) => {
    if (status) callback(d);
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}

module.exports = {
  getOrderInfo: getOrderInfo,
  getWareHouseProductList: getWareHouseProductList
}