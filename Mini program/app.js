//app.js
const wechatLogin = require('utils/wx.login.js');
const memberHttp = require('service/member-http.service.js');

App({
  onLaunch: function(res) {
    console.log('启动场景值',res)
    wx.showLoading({
      title: '加载中',
    })
    wx.getStorage({
      key: "token",
      success: (res) => { //判断本地token————如果缓存里有token
        console.log('打开小程序检测:缓存里已经有token')
        wx.checkSession({
          success: () => { //判断微信端sessionkey————如果checkSession成功
            console.log('打开小程序检测:sessionkey可以用')
            memberHttp.loginWithToken((d, status) => { //把token和member_id传给后端
              if (status) { //判断本地TOKEN是否可用————如果status为真，服务器端token可用，把新的token和id存入缓存
                console.log("用token获取新的token完成，")
                wx.setStorageSync('token', d.token);
                wx.setStorageSync('member_id', d.member_id);
              } else { //判断本地TOKEN是否可用————如果status不可用，发起wechatLogin重新登录
              this.globalData.requestOK = false
                console.log("token已经过期，发起wechatlgoin")
                wechatLogin(this)
              }
            })
          },
          fail: () => { //判断微信端sessionkey————如果sessionkey过期，发起wx.login
            console.log('sessionkey已经过期')
            wechatLogin()


          }
        })
      },
      fail: () => { //判断本地token————如果缓存里没有token，发起wx.login
        console.log('首次打开小程序检测：缓存里没有token,发起wechatLogin')
        wechatLogin(this)


      }
    })
  },
  onShow: function(res) {
    console.log('res.scene',res.scene)
    wx.hideLoading()
    if (res.scene == '1034'){
      wx.redirectTo({
        url: '../index/index'
      })
    }
    console.log(res)
    if (res.scene === '1038') { // 场景值1038：从被打开的小程序返回
      const {
        appId,
        extraData
      } = res.referrerInfo //解构语法
      if (appId == 'wxbd687630cd02ce1d') { // appId为wxbd687630cd02ce1d：从签约小程序跳转回来
        if (typeof extraData == 'undefined') {
          // TODO
          // 客户端小程序不确定签约结果，需要向商户侧后台请求确定签约结果
          memberHttp.getMemberAuthInfo((d) => { //询问后台代扣协议签约状态
            console.log(d.member_auth_info.member_deduct_contract_auth_status)
          })
          return;
        }
        if (extraData.return_code == 'SUCCESS') {
          // TODO
          // 客户端小程序签约成功，需要向商户侧后台请求确认签约结果
          memberHttp.getMemberAuthInfo((d) => { //询问后台代扣协议签约状态
            console.log(d.member_auth_info.member_deduct_contract_auth_status)
          })
          var contract_id = extraData.contract_id
          return;
        } else {
          // TODO
          // 签约失败
          return;
        }
      }
    }
  },
  globalData: {
    productOrderId: '',
    orderList: [],
    pageCount: '10',
    payment_code_info: {
      payment_code_id:'1',
      payment_code_name:'wechat-weixinpay'
    },
    avatarUrl: '',
    requestOK:true
  }
})