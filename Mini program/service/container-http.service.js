let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');

/**@name 获取货柜详情
 * @name function getContainerDetail(container_no|货柜编号，callback|回调函数)
 */
const getContainerDetail = (container_no, callback) => {
  var para = {
    member_id: util.storageMethod.get('member_id'),//会员ID
    member_order_id: '1',//订单ID
    container_no: container_no //货柜编号
  }
  BaseHttp.post(API.getContainerDetail, para, (d, status) => {//d:data,status:状态,
    if (status) { callback(d) }
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}

module.exports = {
  getContainerDetail: getContainerDetail
}