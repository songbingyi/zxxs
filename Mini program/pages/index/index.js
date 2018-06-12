//index.js
//获取应用实例
let app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    indexLogo: "http://218.244.158.175/static/zuoxiang/images/logo_indexbg.png",
  },
  onLoad: function() {
     wx.login({
      success: (res) => {
        if (res.code) {
          wx.getUserInfo({
              complete: function(res1){
                console.log(res1)
            }
          })
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session' + '?appid=wx8bf90b8b9fbcf28e' + '&secret=c4a02cb3d93cde0a949a505c5d7e5b9c' + '&js_code=' + res.code + '&grant_type=authorization_code',
            success: (e) => {
              wx.hideLoading()
              console.log(e)
            }
          })
        }
      }
    })
  },
  onShow: function() {
    //console.log(app.globalData)
    // if (app.globalData.userPayStatus) {

    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true,
    //   })
    // } else {
    //   // wx.showLoading({
    //   //   title: '加载中',
    //   // });
    //   wx.redirectTo({
    //     url: '../authorize/authorize'
    //   })
    // }

  },
  onReady: function() {
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 1000)
    // wx.getUserInfo({
    //   success: res => {
    //     app.globalData.userInfo = res.userInfo
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // })
  },
  //首页扫码功能
  goAuthorize: function() {
      if (app.globalData.userPayStatus){
    wx.scanCode({
      onlyFromCamera: true,
      success: (result) => {
        console.log(result)
        // wx.navigateTo({
        //   url: '../orders/orders'
        // })
      },
      fail: (res) => {
        // wx.navigateTo({
        //   url: '../orders/orders'
        // })
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '请扫描正确的二维码',
          success: function(res) {
            if (res.confirm) {
              console.log('点击了确定')
            }
          }
        })
      }
    })}else{
          wx.navigateTo({
              url: '../authorize/authorize'
          })
    }
  },
  goUser: function() {
    wx.navigateTo({
      url: '../user/user'
    })
  },

  // data: {
  //   motto: 'Hello World',
  //   userInfo: {},
  //   hasUserInfo: false,
  //   canIUse: wx.canIUse('button.open-type.getUserInfo')
  // },
  // //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})