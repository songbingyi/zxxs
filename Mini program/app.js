//app.js
let loginWithWechat = require("service/index-login-http.service.js");

App({
  
  onLaunch: function() {

    //检查本地是否存在token
    var token = wx.getStorageSync('token');
    if (token) {
     console.log(token)
    }else{//缓存里没有token，发起wx.login
      this.doLogin()
      console.log('缓存里没有token',token)
    }
  },
  
  /** @name wx.login 获取code */
  doLogin: () => {
    wx.login({
      success: (res) => {
        var code = res.code;
        var passCode = {code:code}
        if (code) {
          //发送code给后端，获取token和member_id
          loginWithWechat.loginWithWechat({ wechat_code: code},(d)=> {
            //本地存储token和member_id
            wx.setStorageSync('token', d);
          })

        } else {
          wx.showToast({
            title: '获取用户信息失败' + res.errMsg,
          })
        }
      }
    })
  },

  globalData: {
    userphoneInfo: null,
    userPayStatus: false,
    orderList: [],
    userInfo: {}
  }
})