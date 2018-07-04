let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');

/** @name 08-订单-扫码开门
 *  @function addMemberOrder(container_no |货柜编号, callback|回调函数)
 */
const addMemberOrder = (container_no, callback) => {
  var para = {
    member_id: util.storageMethod.get('member_id'),
    member_order_id: '1123123',//订单ID
    container_no: container_no
  }
  BaseHttp.post(API.addMemberOrder, para, (d, status) => {//d:data,status:状态,p:分页信息
    if (status) { callback(d) }
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}


/** @name 11-订单-结算-获取仓库商品列表
 *  @function getWareHouseProductList(page |请求页数, callback|回调函数)
 */
const getWareHouseProductList = (page, callback) => {
  var para = {
    member_id: util.storageMethod.get('member_id'),
    member_order_id: '1123123',//订单ID
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

/** @name 12-订单-结算
 *  @function checkoutMemberOrder(order_info |需要发送的商品订单结算信息, callback|回调函数)
 */
const checkoutMemberOrder = (order_info,callback) => {
    var para = {
        member_id: util.storageMethod.get('member_id'),//会员ID
        member_order_id: '1123123',//订单ID
        submit_member_order_info: order_info //传入商品信息和支付信息
    }
    BaseHttp.post(API.checkoutMemberOrder, para, (d, status) => {//d:data,status:状态
        if (status) { callback(d) }
        else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
    });
}

/** @name 16-订单-获取历史订单列表
 *  @function getProductOrderList(page |请求页数, callback|回调函数)
 */
const getProductOrderList = (page, callback) => {
  var para = {
    member_id: util.storageMethod.get('member_id'),
    pagination: {
      page: page, //请求页数
      count: getApp().globalData.pageCount //请求数量
    }
  }
  BaseHttp.post(API.getProductOrderList, para, (d, status, p) => {//d:data,status:状态,p:分页信息
    if (status) { callback(d, p) }
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}

module.exports = {
  getWareHouseProductList: getWareHouseProductList,
  checkoutMemberOrder: checkoutMemberOrder,
  addMemberOrder: addMemberOrder,
  getProductOrderList: getProductOrderList
}