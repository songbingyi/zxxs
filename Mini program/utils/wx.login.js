const loginWithWechat = require('../service/loginWithWechat-http.service.js')
var doLogin = function() {
  wx.login({
    success: (res) => {
      var code = res.code;
      var passCode = { code: code }
      if (code) {
        //发送code给后端，获取token和member_id
        loginWithWechat.loginWithWechat({ wechat_code: code }, (d) => {
          //本地存储token和member_id
          console.log('wx.login结束，获取新的token')
          wx.setStorageSync('token', d.token);
          wx.setStorageSync('member_id', d.member_id);
        })
      } else {
        wx.showToast({
          title: '获取用户信息失败' + res.errMsg,
        })
      }
    }
  })
}

module.exports = doLogin;