//app.js
App({
  onLaunch: function() {

    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    //微信登录
    var skey = wx.getStorageSync('skey');
    if (skey) {
      wx.checkSession({
        success: () => {
          console.log('successcheckSession',skey)
        },
        fail: () => {
          console.log('failcheckSession', skey)
          this.doLogin()
        }
      })
    }else{
      this.doLogin()
      console.log('缓存里没有Session', skey)
    }
  },
  /** @name wx.login 获取code */
  doLogin: () => {
    wx.login({
      success: (res) => {
        var code = res.code;
        if (code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session' + '?appid=wx8bf90b8b9fbcf28e' + '&secret=e5bd94eb0ba0e5a99304fac78a3f065e' + '&js_code=' + code + '&grant_type=authorization_code',
            success: (e) => {//此处应该返回第三方session_id
              console.log(e)
              wx.setStorageSync('skey', e.data.session_key)
            }
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