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
    member_id: util.storageMethod.getSync('member_id')
  }
  BaseHttp.post(API.getMemberAuthInfo, para, (d, status) => {
    if (status) callback(d);
    else util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d));
  });
}


/** @name 04-会员-记录登录状态-获取token-token获取token */
const loginWithToken = (callback) => {
  var para = {
    member_id: wx.getStorageSync('member_id')
  }
  BaseHttp.post(API.loginWithToken, para, (d, status) => {
    callback(d,status)
  });
}


/** @name 05-会员-获取会员详情 */
const getMemberDetail = (callback) => {
  var para = {
    member_id: util.storageMethod.getSync('member_id')
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
    member_id: util.storageMethod.getSync('member_id')
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
const setPhoneNumber = (submitInfo,callback) => {
  var para = {
    member_id: util.storageMethod.getSync('member_id'),
    submit_phone_number: submitInfo
  }
  BaseHttp.post(API.setPhoneNumber, para, (d, status) => {
    if (status){callback(d)}
    else{util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d))
      wx.hideLoading()
    }
  });
}

/** 
 * @name 19-会员-会员-获取小程序微信会员信息
 * @param submitInfo:{iv:'',encrypted_data:'',signature,raw_data
}
 * @param callback callback回调
 */
const setWechatMiniProgramMemberInfo = (submitInfo, callback) => {
  var para = {
    member_id: util.storageMethod.getSync('member_id'),
    submit_mini_program_member_info: submitInfo
  }
  BaseHttp.post(API.setWechatMiniProgramMemberInfo, para, (d, status) => {
    if (status) { callback(d) }
    else {
      util.showModalWithNotice('提示', '请求失败:' + JSON.stringify(d))
      wx.hideLoading()
    }
  });
}



module.exports = {
  loginWithWechat: loginWithWechat,
  getMemberAuthInfo: getMemberAuthInfo,
  loginWithToken: loginWithToken,
  getMemberDetail: getMemberDetail,
  setPhoneNumber: setPhoneNumber,
  submitDeductContract: submitDeductContract,
  setWechatMiniProgramMemberInfo: setWechatMiniProgramMemberInfo
}