const memberHttp = require('../service/member-http.service.js')

var wechatLogin = function() {

  wx.login({
    success: (res) => {
      var that = this;
      console.log(res)
      var code = res.code;
      var passCode = { code: code }
      if (code) {
        //发送code给后端，获取token和member_id
        memberHttp.loginWithWechat({ wechat_code: code }, (d) => {
          //本地存储token和member_id
          console.log('WechatLogin结束，获取新的token')
          wx.setStorageSync('token', d.token);
          wx.setStorageSync('member_id', d.member_id);
          wx.checkSession({
            success:()=>{
              console.log("wx.login成功之后再次检测sessionkey:成功")
            },
            fail:()=>{
              console.log("wx.login成功之后再次检测sessionkey:失败")
              wechatLogin()
            }
          })
        })
      } else {
        wx.showToast({
          title: '登录失败，请关闭小程序重新登录' + res.errMsg,
        })
      }
    },
    fail:()=>{
      wx.showToast({
        title: '登录失败，请检查网络状况'
      })
    }
  })
}

module.exports = wechatLogin;