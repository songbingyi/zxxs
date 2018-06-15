//BaseHttp 2018.06.14 by Lemon

const util = require('../utils/util.js')
const API = require('../utils/API.js')

/** @name 公共请求参数 */
const commonParams = {
  device_type: '10',
  device_version: '1.0',
  version_code: '1',
  channel:'20001_website',
  route: '',
  jsonText: {}
};

/** 
 * @name HTTP基类方法对象
 * @function BaseHttp.post(route|请求路径, params|请求参数, callback)
 * @params callback(d, status, pagination) 回调
 */
function BaseHttp() { };

BaseHttp.post = function (route, params, callback) {
  let self = this;
  commonParams.route = route;
  commonParams.jsonText = JSON.stringify(params);
  console.log('Request => ', commonParams);
  wx.request({
    url: API.serve_url + route, // + route 用于 easy-mock 测试，正常接口请求需要将route作为参数传入
    data: commonParams,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: "POST",
    success: function (d) {
      console.log('Result => ', JSON.stringify(d.data));
      self.handleResult(d.data, callback);
    },
    fail: function (e) {
      util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(e));
    }
  });
}

/** 返回数据解析 */
BaseHttp.handleResult = function (d, callback) {
  if (d && d.status) {
    if (d.status.succeed == '1') {
      if (d.paginated) {
        callback(d.data == null ? "" : d.data, true, d.paginated);
      } else {
        callback(d.data == null ? "" : d.data, true);
      }
    }
    /**
     * @name 接口请求失败
     * @return { succeed: 0, error_code:'错误码', error_desc: '错误消息' }
     */
    if (d.status.succeed == '0') { callback(d, false); }
  } else {
    //返回的数据不是json或者不是按照接口规则返回的
    util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  }
}

module.exports = BaseHttp;