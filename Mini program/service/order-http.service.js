let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');

/** @name 08-订单-扫码开门
 *  @function addProductOrder(container_no |货柜编号, callback|回调函数)
 */
const addProductOrder = (container_no, callback) => {
  var para = {
    member_id: util.storageMethod.getSync('member_id'),
    container_no: container_no,
    //坐标TODO？
  }
  BaseHttp.post(API.addProductOrder, para, (d, status) => {//d:data,status:状态,p:分页信息
    // if (status) { callback(d) }
    // else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
    callback(d,status)
  });
}


/** @name 11-订单-获取仓库商品列表
 *  @function getWareHouseProductList(page |请求页数, callback|回调函数)
 */
const getWareHouseProductList = (page, callback) => {
  var para = {
    member_id: util.storageMethod.getSync('member_id'),//会员ID
    product_order_id: util.storageMethod.getSync('productOrderId'),//商品订单ID
    pagination: {//分页参数
      page: page,//请求的页数
      count: getApp().globalData.pageCount //请求的数量
    }
  }
  BaseHttp.post(API.getWareHouseProductList, para, (d, status,p) => {//d:data,status:状态,p:分页信息
    if (status) {callback(d,p)}
    else{
      wx.hideLoading()
      util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
      }
  });
}

/** @name 12-订单-结算
 *  @function checkoutProductOrder(order_info |需要发送的商品订单结算信息, callback|回调函数)
 */
const checkoutProductOrder = (order_info,callback) => {
    var para = {
      member_id: util.storageMethod.getSync('member_id'),//会员ID
      product_order_id: util.storageMethod.getSync('productOrderId'),//商品订单ID
      submit_product_order_info: order_info //传入商品信息和支付信息，应包括product_list和payment_code_info
    }
    BaseHttp.post(API.checkoutProductOrder, para, (d, status) => {//d:data,status:状态
      callback(d,status)
        // if (status) { callback(d) }
       // else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
    });
}


/** @name 14-订单-获取订单详情
 *  @function getProductOrderDetail(order_info |需要发送的商品订单结算信息, callback|回调函数)
 */
const getProductOrderDetail = (callback) => {
  var para = {
    member_id: util.storageMethod.getSync('member_id'),//会员ID
    product_order_id: util.storageMethod.getSync('productOrderId'),//商品订单ID
  }
  BaseHttp.post(API.getProductOrderDetail, para, (d, status) => {//d:data,status:状态
     if (status) { callback(d) }
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}



/** @name 16-订单-获取历史订单列表
 *  @function getProductOrderList(page |请求页数, callback|回调函数)
 */
const getProductOrderList = (page, callback) => {
  var para = {
    member_id: util.storageMethod.getSync('member_id'),
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


/** @name 20-订单-支付订单
 *  @function addProductOrder(productOrderId |商品订单ID, callback|回调函数)
 */
const payProductOrder = ( callback) => {
  var para = {
    member_id: util.storageMethod.getSync('member_id'),
    product_order_id: util.storageMethod.getSync('productOrderId'),

  }
  BaseHttp.post(API.payProductOrder, para, (d, status) => {//d:data,status:状态
    if (status) { callback(d) }
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));

  });
}


module.exports = {
  getWareHouseProductList: getWareHouseProductList,
  checkoutProductOrder: checkoutProductOrder,
  addProductOrder: addProductOrder,
  getProductOrderList: getProductOrderList,
  payProductOrder: payProductOrder,
  getProductOrderDetail: getProductOrderDetail
}