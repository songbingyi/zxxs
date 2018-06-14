// pages/authorize/authorize.js
let app = getApp()

Page({
  data: {
    phoneNumberBtnDisabled: false,
    payBtnDisabled: true,
    authorizeStatus:'授权登录'
  },
  //授权登录按钮功能:
  getPhoneNumber: function(res) {
    //用户点击确定，1号按钮变暗，2号按钮变亮
    if (res.detail.iv) {
      console.log(res)
      this.setData({
        payBtnDisabled: false,
        phoneNumberBtnDisabled: true,
        authorizeStatus:'  已授权  '
      })
    }
  
  }, 

  getPayInfo: () => {
    app.globalData.userPayStatus = true
    wx.navigateBack({
      url: '../index/index'
    })
  }

})