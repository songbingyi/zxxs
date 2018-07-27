const memberHttp = require('../service/member-http.service.js')

var wechatLogin = function(t) {
  t.globalData.requestOK = false
  wx.login({

    success: (res) => {
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
          t.globalData.requestOK = true;
      // 由于 wx.login 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况

          if (t.syncallback) {
            t.syncallback()
            console.log('回调发起请求:t.syncallback')
          }else{
            console.log('t.syncallback不存在')
          }

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