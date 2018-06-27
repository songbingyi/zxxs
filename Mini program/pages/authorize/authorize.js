// pages/authorize/authorize.js
let app = getApp()

Page({
  data: {
    phoneNumberBtnDisabled: false,
    payBtnDisabled: true,
    authorizeStatus:'授权登录',
  },
  onLoad:function(){
    let authstatus = app.globalData.memberAuthStatus//从全局变量里获取授权信息
    this.setData({
      phoneNumberBtnDisabled:authstatus.member_mobile_auth_status,
    })
  },
  //授权登录按钮功能:
  getPhoneNumber: function(res) {
    //用户点击确定，1号按钮变暗，2号按钮变亮
    if (res.detail.iv) {
      console.log(res)//给后台传递电话信息
      this.setData({
        payBtnDisabled: false,
        phoneNumberBtnDisabled: true,
        authorizeStatus:'  已授权  '
      })
    }
  }, 
  getPayInfo: () => {
    app.globalData.userPayStatus = true
    
    //跳转回首页
    // wx.navigateBack({
    //   url: '../index/index'
    // })
  }

})