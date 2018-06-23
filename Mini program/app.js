//app.js
const doLogin = require('utils/wx.login.js')

App({
  
  onLaunch: function() {
    wx.showLoading({
      title: '加载中',
    })
    //检查本地是否存在token
    var token = wx.getStorageSync('token');
   if (token) {
     console.log('首次打开小程序检测:缓存里已经有token')
   }else{//缓存里没有token，发起wx.login
     console.log('首次打开小程序检测：缓存里没有token,发起doLogin')
      doLogin()
     // wx.hideLoading()
   }
  },

  /** @name wx.login 获取code */

  globalData: {
    userphoneInfo: null,
    userPayStatus: false,
    orderList: [],
    userInfo: {}
  }
})