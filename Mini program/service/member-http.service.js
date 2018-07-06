let BaseHttp = require("../utils/base-http.js");
let API = require("../utils/API.js");
let util = require('../utils/util.js');


/** @name 02-会员-微信登录-换取token */
const loginWithWechat = (para,callback) => {
  BaseHttp.post(API.loginWithWechat, para, (d, status) => {
    if (status) callback(d);
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}

/** @name 03-会员-获取会员授权信息 */
const getMemberAuthInfo = (callback) => {
  var para = {
    member_id: util.storageMethod.get('member_id')
  }
  BaseHttp.post(API.getMemberAuthInfo, para, (d, status) => {
    if (status) callback(d);
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}


/** @name 04-会员-记录登录状态-获取token-token获取token */
const loginWithToken = (callback) => {
  var para = {
    member_id1: util.storageMethod.get('member_id')
  }
  BaseHttp.post(API.loginWithToken, para, (d, status) => {
    callback(d,status)
  });
}


/** @name 05-会员-获取会员详情 */
const getMemberDetail = (callback) => {
  var para = {
    member_id: util.storageMethod.get('member_id')
  }
  BaseHttp.post(API.getMemberDetail, para, (d, status) => {
    if (status) callback(d);
    else {
      wx.hideLoading()
      util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d))
      }
  });
}

/** @name 06-会员-申请免密支付 */
const submitDeductContract = (callback) => {
  var para = {
    member_id: util.storageMethod.get('member_id')
  }
  BaseHttp.post(API.submitDeductContract, para, (d, status) => {
    if (status) callback(d);
    else {
      wx.hideLoading()
      util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d))
    }
  });
}


/** 
 * @name 18-会员-获取用户绑定的手机号
 * @param submitInfo:{iv:'',encrypted_data:''}
 * @param callback callback回调
 */
const getPhoneNumber = (submitInfo,callback) => {
  var para = {
    member_id: util.storageMethod.get('member_id'),
    submit_phone_number: submitInfo
  }
  BaseHttp.post(API.getPhoneNumber, para, (d, status) => {
    if (status){callback(d)}
    else{util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d))
      wx.hideLoading()
    }
  });
}



module.exports = {
  loginWithWechat: loginWithWechat,
  getMemberAuthInfo: getMemberAuthInfo,
  loginWithToken: loginWithToken,
  getMemberDetail: getMemberDetail,
  getPhoneNumber: getPhoneNumber,
  submitDeductContract: submitDeductContract
}