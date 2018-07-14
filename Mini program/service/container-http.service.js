let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');

/**@name 获取货柜详情
 * @name function getContainerDetail(container_no|货柜编号，callback|回调函数)
 */
const getContainerDetail = (containerNo, callback) => {
  var para = {
    member_id: util.storageMethod.getSync('member_id'),//会员ID
    container_no: containerNo //货柜编号
  }
  BaseHttp.post(API.getContainerDetail, para, (d, status) => {//d:data,status:状态,
    if (status) { callback(d) }
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}

module.exports = {
  getContainerDetail: getContainerDetail
}