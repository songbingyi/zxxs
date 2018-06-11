//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    indexLogo: "http://218.244.158.175/static/zuoxiang/images/logo_indexbg.png",
  },
  // onLoad: function () {
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  // },
  onShow: function () {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      },
      fail: res => {
        wx.showLoading({
          title: '加载中',
        });
        wx.navigateTo({
          url: '../authorize/authorize'
        })
      }
    })
  },
  onReady: function () {
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
  goAuthorize: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: (result) => {
        console.log(result)
        // wx.navigateTo({
        //   url: '../orders/orders'
        // })
      },
      fail: (res) => {

        wx.navigateTo({
          url: '../orders/orders'
        })
        // wx.showModal({
        //   title: '提示',
        //   showCancel: false,
        //   content: '请扫描正确的二维码',
        //   success: function (res) {
        //     if (res.confirm) {
        //       console.log('点击了确定')
        //     }
        //   }
        // })
      }
    })
  },
  goUser: function () {
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
