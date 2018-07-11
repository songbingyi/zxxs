//app.js
const wechatLogin = require('utils/wx.login.js');
const memberHttp = require('service/member-http.service.js');

App({
  onLaunch: function() {
    wx.showLoading({
      title: '加载中',
    })
    //检查本地是否存在token
    var token = wx.getStorageSync('token'),
      member_id = wx.getStorageSync('member_id');
    if (token) { //如果本地token存在,发起登录状态检测
      console.log('首次打开小程序检测:缓存里已经有token')
      memberHttp.loginWithToken((d, status) => {
        if (status) { //如果status为真，服务器端token没有过过期，把新的token和id存入缓存
          console.log("用token获取新的token完成，")
          wx.setStorageSync('token', d.token);
          wx.setStorageSync('member_id', d.member_id);
        } else {//如果status为假，token已经过期，发起wechatLogin重新登录
          console.log("token已经过期，发起wechatlgoin")
          wechatLogin()
        } 
      })
    } else { //缓存里没有token，发起wx.login
      console.log('首次打开小程序检测：缓存里没有token,发起wechatLogin')
      wechatLogin()
    }
  },
  onShow: function() {
    wx.hideLoading()
  },

  globalData: {
    productOrderId:'',
    //memberAuthStatus:{},
    //userphoneInfo: null,
    //userPayStatus: false,
    orderList: [],
    //userInfo: {},
    pageCount: '10',
    payment_code_info: {
      payment_code_id: "支付方式ID",
      payment_code_name: "支付方式名称"
    }
  }
})