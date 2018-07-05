// pages/authorize/authorize.js
let app = getApp()
let memberHttp = require('../../service/member-http.service.js');
let util = require('../../utils/util.js');
Page({
  data: {
    phoneNumberBtnDisabled: false,
    payBtnDisabled: true,
    authorizeStatus:'授权登录',
  },
  onLoad:function(){
    let authstatus = app.globalData.memberAuthStatus//从全局变量里获取授权信息
    this.setData({
      phoneNumberBtnDisabled:authstatus.member_mobile_auth_status//决定按钮的激活和关闭
    })
  },
  //授权登录按钮功能:
  getPhoneNumberAuth: function(res) {
    //如果用户点击确定，1号按钮变暗，2号按钮变亮
    if (res.detail.iv) {
      console.log(res)//给后台传递电话信息
      let submitInfo = {
        iv:res.detail.iv,
        encrypted_data: res.detail.encryptedData
        }//拼接电话加密信息作为参数
      memberHttp.getPhoneNumber(submitInfo,()=>{//电话加密信息传给后端
        memberHttp.getMemberDetail((d) => {//从后端获取电话号码，设置到视图层
          util.storageMethod.set('userPhoneNum', d.member_info.mobile) //电话号码存储到缓存
        })
      })
      this.setData({
        payBtnDisabled: false, //1号按钮变暗
        phoneNumberBtnDisabled: true, //2号按钮变量
        authorizeStatus:'  已授权  ' //1号按钮文字改变
      })
    }
  }, 
  getPayInfo: () => {
    //app.globalData.userPayStatus = true
    
    //跳转回首页
    // wx.navigateBack({
    //   url: '../index/index'
    // })
  }

})