//app.js
const wechatLogin = require('utils/wx.login.js');
const tokenLogin = require('service/loginWithToken-http.service.js');

App({
  onLaunch: function() {
    wx.showLoading({
      title: '加载中',
    })
    //检查本地是否存在token
    var token = wx.getStorageSync('token'),
      member_id = wx.getStorageSync('member_id')
   if (token) {//如果本地token存在,发起登录状态检测
     console.log('首次打开小程序检测:缓存里已经有token')
     tokenLogin.loginWithToken({ member_id: member_id},(d)=>{
        //登录状态检测：如果本地token非法，发起wechatLogin()获得新的token
     })
   }else{//缓存里没有token，发起wx.login
     console.log('首次打开小程序检测：缓存里没有token,发起wechatLogin')
     wechatLogin()
   }
  },

  /** @name wx.login 获取code */

  globalData: {
    memberAuthStatus:{},
    userphoneInfo: null,
    userPayStatus: false,
    orderList: [],
    userInfo: {}
  }
})