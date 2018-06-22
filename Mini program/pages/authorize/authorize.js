// pages/authorize/authorize.js
let app = getApp()

Page({
  data: {
    phoneNumberBtnDisabled: false,
    payBtnDisabled: true,
    authorizeStatus:'授权登录',
    extraData: {
      appid: 'wx8bf90b8b9fbcf28e',
      contract_code: '122',
      contract_display_account: '张三',
      mch_id: '1223816102',
      notify_url: 'https://www.qq.com/test/papay',
      plan_id: '106',
      request_serial: '123',
      timestamp: 1414488825,
      sign: 'FF1A406564EE701064450CA2149E2514'
    },
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
    
    //跳转回首页
    // wx.navigateBack({
    //   url: '../index/index'
    // })
  }

})